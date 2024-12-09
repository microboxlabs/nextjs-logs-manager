export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="flex h-[100px] items-center pb-8 pt-4">
          <p>
            Desarrollador por{" "}
            <a
              target="_blank"
              href="https://github.com/almsrr"
              className="font-medium text-teal-700 hover:underline dark:text-blue-500"
            >
              @Almsrr
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
