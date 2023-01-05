export default function Footer() {
  return (
    <div className="w-full text-center fixed bottom-0 my-4 bg-slate-800">
      &copy; JLL {new Date().getFullYear()}
    </div>
  );
}
