export async function getSignature(
  authHeaders: Record<string, string>,
  options?: Record<string, string>
) {
  const res = await fetch("/api/sign", {
    method: "POST",
    headers: {
      "x-trace-id": new Date().getTime().toString(36),
      ...(authHeaders || {}),
    },
    body: JSON.stringify(options || {}),
  });
  return await res.json();
}
