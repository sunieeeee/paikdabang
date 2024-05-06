/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
/** ServerSide에서 StyledComponent가 작동하게 함 */
  compiler: { styledComponents: true }
};

export default nextConfig;
