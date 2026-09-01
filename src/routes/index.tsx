import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Envelope } from "@/components/birthday/envelope";
import { Experience } from "@/components/birthday/experience";
import { startMusic } from "@/lib/music-box";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [opened, setOpened] = useState(false);

  const onOpened = useCallback(() => {
    startMusic();
    setOpened(true);
  }, []);

  return opened ? <Experience /> : <Envelope onOpened={onOpened} />;
}
