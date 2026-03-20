import "server-only";
import { Resend } from "resend";

const CHUNK_SIZE = 100;

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.NEWSLETTER_FROM_EMAIL;

if (!resendApiKey) {
  throw new Error("Missing RESEND_API_KEY");
}

if (!fromEmail) {
  throw new Error("Missing NEWSLETTER_FROM_EMAIL");
}

const resend = new Resend(resendApiKey);

export type DeliveryAttempt = {
  subscriberId: number;
  email: string;
  status: "sent" | "failed";
  providerMessageId: string | null;
  error: string | null;
};

export type IssueForSend = {
  id: number;
  city_id: number;
  subject: string;
  slug: string;
  html: string;
  text: string;
};

export type SubscriberForSend = {
  id: number;
  email: string;
  unsubscribe_token: string;
};

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function buildHtml(issueHtml: string, unsubscribeUrl: string) {
  return `${issueHtml}<p style="margin-top:24px;font-size:12px;color:#666;">Unsubscribe: <a href="${unsubscribeUrl}">${unsubscribeUrl}</a></p>`;
}

function buildText(issueText: string, unsubscribeUrl: string) {
  return `${issueText}\n\nUnsubscribe: ${unsubscribeUrl}`;
}

export async function sendIssueInBatches(params: {
  issue: IssueForSend;
  subscribers: SubscriberForSend[];
  appBaseUrl: string;
}) {
  const { issue, subscribers, appBaseUrl } = params;
  const attempts: DeliveryAttempt[] = [];
  const cleanBaseUrl = appBaseUrl.replace(/\/$/, "");
  const subscriberChunks = chunk(subscribers, CHUNK_SIZE);

  for (const subscriberChunk of subscriberChunks) {
    const emailsPayload = subscriberChunk.map((subscriber) => {
      const unsubscribeUrl = `${cleanBaseUrl}/unsubscribe/${subscriber.unsubscribe_token}`;
      return {
        from: fromEmail,
        to: subscriber.email,
        subject: issue.subject,
        html: buildHtml(issue.html, unsubscribeUrl),
        text: buildText(issue.text, unsubscribeUrl),
      };
    });

    const response = await resend.batch.send(emailsPayload);
    const batchError = response.error;

    if (batchError) {
      for (const subscriber of subscriberChunk) {
        attempts.push({
          subscriberId: subscriber.id,
          email: subscriber.email,
          status: "failed",
          providerMessageId: null,
          error: batchError.message ?? "Batch send failed",
        });
      }
      continue;
    }

    const responseData =
      response.data && Array.isArray(response.data) ? response.data : new Array(subscriberChunk.length).fill(null);

    for (let i = 0; i < subscriberChunk.length; i += 1) {
      const subscriber = subscriberChunk[i];
      const message = responseData[i] as { id?: string } | null;
      attempts.push({
        subscriberId: subscriber.id,
        email: subscriber.email,
        status: "sent",
        providerMessageId: message?.id ?? null,
        error: null,
      });
    }
  }

  return attempts;
}
