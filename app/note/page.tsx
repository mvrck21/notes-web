import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

export default function Note() {
  const noteId = uuidv4();

  return (
    <div className="bg-blue-100 h-screen">
      <div>there will be a list of notes maybe</div>
      <Link href={`/note/${noteId}`}>go to note #{noteId}</Link>
    </div>
  );
}
