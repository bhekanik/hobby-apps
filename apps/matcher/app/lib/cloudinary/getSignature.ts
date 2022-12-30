export async function getSignature(options?: Record<string, string>) {
  const res = await fetch("/api/sign", {
    method: "POST",
    headers: {
      "x-trace-id": new Date().getTime().toString(36),
    },
    body: JSON.stringify(options || {}),
  });
  return await res.json();
}
