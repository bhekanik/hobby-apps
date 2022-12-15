import { Flex, FlexProps } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export function Loader(props: FlexProps) {
  const ref = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <Flex
      bgColor="white"
      {...props}
      justifyContent="center"
      alignItems="center"
    >
      <lottie-player
        id="loader"
        ref={ref}
        autoplay
        // controls
        loop
        mode="normal"
        src="/loader.json"
        style={{ width: "320px", height: "320px" }}
      ></lottie-player>
    </Flex>
  );
}
