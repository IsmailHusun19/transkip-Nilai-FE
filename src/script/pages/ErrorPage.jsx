const ErrorPage = () => {
  return (
    <>
      <section className="bg-white h-screen flex justify-center items-center flex-col dark:bg-gray-900">
        <div className="py-8 px-4 mx-autolg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              500
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Internal Server Error.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              We are already working to solve the problem.{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <a
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </a>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
