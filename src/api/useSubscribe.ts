import { useMutation } from "react-query";
import { env } from "../env/client.mjs";

export function useSubscribe() {
  const { mutateAsync, isLoading } = useMutation(
    ({ email, token }: { email: string; token: string }) =>
      fetch(`${env.NEXT_PUBLIC_NEWSLETTER_API}/subscriptions`, {
        method: "POST",
        body: JSON.stringify({
          email,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong");
        }
      })
  );

  return { subscribe: mutateAsync, isLoading };
}
