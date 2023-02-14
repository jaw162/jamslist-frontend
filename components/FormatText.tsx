import { v4 as uuidv4 } from "uuid";

export default function FormatText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map(el => {
        return (
          <p key={uuidv4()}>
            {el}
            <br />
            <br />
          </p>
        );
      })}
    </>
  );
}
