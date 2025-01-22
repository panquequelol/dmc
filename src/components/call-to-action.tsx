export default function CallToAction(props: { text: string }) {
  return (
    <a
      href="https://wa.me/56999312713"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 duration-200 p-4 rounded-xl w-full text-center block text-white"
    >
      {props.text}
    </a>
  );
}
