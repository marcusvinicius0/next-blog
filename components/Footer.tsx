export default function Footer({}) {
  return (
    <footer className="bg-slate-100 p-4 space-y-4 mt-10">
      <p className="text-center font-bold text-sm">
        Made with 💖 by{" "}
        <a
          href="https://github.com/marcusvinicius0"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-400"
        >
          <i>Marcus Vinícius</i>
        </a>
      </p>
      <p className="text-xs text-center font-semibold">© 2023 Marcus Vinícius Begheli</p>
    </footer>
  );
}
