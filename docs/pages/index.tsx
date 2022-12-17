import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default function Home() {
  const router = useRouter();

  useLayoutEffect(() => {
    const { pathname } = router;
    if (pathname == "/") {
      router.push("/introduction");
    }
  });

  return <strong>Give us a second...</strong>;
}
