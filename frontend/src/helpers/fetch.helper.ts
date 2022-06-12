export const fetchJSON = async (...args: Parameters<typeof fetch>) => {
  const response= await fetch(...args)
  if (response.status !== 200) return
  return response.json()
}
