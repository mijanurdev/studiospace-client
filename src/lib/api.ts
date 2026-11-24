import type { Booking, BookingInput, Studio, StudioInput } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token", { credentials: "include" });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    if (typeof data.token === "string") {
      return data.token;
    }
    if (typeof data?.data?.token === "string") {
      return data.data.token;
    }
    return null;
  } catch {
    return null;
  }
}

function toStudioList(data: unknown): Studio[] {
  if (Array.isArray(data)) {
    return data as Studio[];
  }
  if (data && typeof data === "object" && Array.isArray((data as { studios?: unknown }).studios)) {
    return (data as { studios: Studio[] }).studios;
  }
  return [];
}

function toBookingList(data: unknown): Booking[] {
  if (Array.isArray(data)) {
    return data as Booking[];
  }
  if (data && typeof data === "object" && Array.isArray((data as { bookings?: unknown }).bookings)) {
    return (data as { bookings: Booking[] }).bookings;
  }
  return [];
}

export async function getStudios(category?: string, limit?: number): Promise<Studio[]> {
  const params = new URLSearchParams();
  if (category) {
    params.set("category", category);
  }
  if (limit) {
    params.set("limit", String(limit));
  }
  const query = params.toString();
  const url = query ? `${API_URL}/api/studios?${query}` : `${API_URL}/api/studios`;
  const res = await fetch(url);
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return toStudioList(data);
}

export async function getStudio(id: string): Promise<Studio | null> {
  const res = await fetch(`${API_URL}/api/studios/${id}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  if (data && typeof data === "object" && (data as { _id?: string })._id) {
    return data as Studio;
  }
  return null;
}

export async function createStudio(input: StudioInput): Promise<Studio> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/studios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || data.message || "Studio add hoy ni");
  }
  return data as Studio;
}

export async function updateStudio(id: string, input: StudioInput): Promise<Studio> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/studios/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || data.message || "Studio update hoy ni");
  }
  return data as Studio;
}

export async function deleteStudio(id: string): Promise<void> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/studios/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { msg?: string }).msg || "Studio delete hoy ni");
  }
}

export async function getBookings(email: string): Promise<Booking[]> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/bookings?email=${encodeURIComponent(email)}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return toBookingList(data);
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.msg || data.message || "Booking hoy ni");
  }
  return data as Booking;
}

export async function cancelBooking(id: string): Promise<void> {
  const token = await getToken();
  const res = await fetch(`${API_URL}/api/bookings/${id}/cancel`, {
    method: "PATCH",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { msg?: string }).msg || "Cancel hoy ni");
  }
}