import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/webLogo.png" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "3NOT3",
  keywords: "Gaming",
  description: "Get the latest games here",
};

export default Meta;
