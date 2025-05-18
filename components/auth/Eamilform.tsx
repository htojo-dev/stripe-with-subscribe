import Link from "next/link";
import { Button } from "../ui/button";
import { login, signup } from "./actions";

const Eamilform = () => {
  return (
    <form className="mb-8 border-b">
      <div className="mb-3">
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
            name="email"
            type="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <input
            id="password"
            className="w-full bg-gray-100 py-2 px-4 rounded-xs cursor-pointer"
            name="password"
            type="text"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <Button formAction={login} className="cursor-pointer">
          Log in
        </Button>
        <Button formAction={signup} className="ml-3 cursor-pointer">
          sign up
        </Button>
      </div>

      <p className="mb-5">パスワードを忘れた場合は<Link href="/password-reset" className="underline">こちら</Link></p>
    </form>
  );
};

export default Eamilform;
