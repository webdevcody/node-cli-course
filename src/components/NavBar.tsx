import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../utils/api";

export function NavBar() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const isPaid = api.payment.isPaidEmail.useQuery(
    { email },
    {
      enabled: false,
    }
  );

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    isPaid
      .refetch()
      .then(({ data }) => {
        if (data?.isValid) {
          setEmail("");
          router.push(`/course?email=${email}`).catch(console.error);
        } else {
          setError("invalid login");
        }
      })
      .catch(() => {
        setError("something went wrong");
      });
  }

  return (
    <nav className="py-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="https://www.webdevcody.com/wdc.jpeg"
            className="mr-3 h-6 rounded-full sm:h-10"
            alt="Web Dev Cody logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Node CLI Mini Course
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="mt-4 flex flex-col rounded-lg border md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium">
            <form onSubmit={login} className="flex gap-4">
              {/* <input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="email"
                name="email"
              ></input> */}
              <button className="rounded bg-white py-2 px-4 text-black hover:bg-wdc-primary-darker hover:text-white">
                Sign In
              </button>

              <span className="text-red-500">{error}</span>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
}
