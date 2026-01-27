import { apiClient } from "@/lib/apiClient";

type JoinWaitlistParams = {
  productId: number;
  email?: string;
};

type JoinWaitlistResponse = {
  status: "registered" | "already_registered";
  message?: string;
};

export async function joinWaitlist(params: JoinWaitlistParams): Promise<JoinWaitlistResponse> {
  const { productId, email } = params;

  const res = await apiClient.post<JoinWaitlistResponse>("/api/waitlist/join", {
    product_id: productId,
    ...(email ? { email } : {}),
  });

  return res.data;
}

type RemoveWaitlistParams = {
  productId: number;
  email?: string;
};

type RemoveWaitlistResponse = {
  status: "removed";
  message?: string;
};

export async function removeWaitlist(params: RemoveWaitlistParams): Promise<RemoveWaitlistResponse> {
  const { productId, email } = params;

  const res = await apiClient.post<RemoveWaitlistResponse>("/api/waitlist/remove", {
    product_id: productId,
    ...(email ? { email } : {}),
  });

  return res.data;
}

type WaitlistStatusParams = {
  productId: number;
  email: string;
};

type WaitlistStatusResponse = {
  registered: boolean;
};

export async function getWaitlistStatus(params: WaitlistStatusParams): Promise<WaitlistStatusResponse> {
  const { productId, email } = params;

  const res = await apiClient.get<WaitlistStatusResponse>("/api/waitlist/status", {
    params: {
      product_id: productId,
      email,
    },
  });

  return res.data;
}
