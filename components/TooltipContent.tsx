import { useEffect, useState } from "react";

import Link from "next/link";

type Props = {
  nodeId: string;
  onLinkClick: Function;
};

type Response = {
  id: string;
  joke: string;
  status: number;
  [k: string]: any;
};

export function TooltipContent({ nodeId, onLinkClick }: Props) {
  const [data, setData] = useState<Response | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (!nodeId) {
    return <div>sorry! No node id</div>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No profile data</p>;
  }

  console.log(JSON.stringify(data, null, 2));

  return (
    <div>
      <div className="w-64">{`ability: ${data.abilities[0].ability.name} for node id ${nodeId}`}</div>
      <div className="text-right">
        {/* <Link href={`/url-${nodeId}`}>go to the note</Link> */}
        <Link href={`/`} onClick={() => onLinkClick(true)}>
          go to the note
        </Link>
      </div>
    </div>
  );
}
