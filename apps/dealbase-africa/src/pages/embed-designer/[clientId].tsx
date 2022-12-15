import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEventHandler, useRef, useState } from "react";
import { ColorModeToggle } from "shared-components";

const chartTypes = ["monthly", "map", "sectors", "diversity", "compare"];

export default function TestEmbedPage() {
  const {
    query: { clientId },
  } = useRouter();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const handleThemeChange = () => {
    if (theme === "dark") setTheme("light");
    if (theme === "light") setTheme("dark");
  };

  const [charts, setCharts] = useState("");
  const [embedCode, setEmbedCode] = useState("");
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(500);
  const [iframeDimensions, setIframeDimensions] = useState({
    width: "1000px",
    height: "500px",
  });

  const handleDimensionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "width") {
      setWidth(+value);
    } else if (name === "height") {
      setHeight(+value);
    }
  };

  const generateEmbedCode = () => {
    setEmbedCode(
      `<iframe src="http://localhost:3000/embed/${clientId}?charts=${charts}&theme=${theme}&w=${iframeDimensions.width}&h=${iframeDimensions.height}" width="${iframeDimensions.width}" height="${iframeDimensions.height}" />`
    );
  };

  const refreshIframe = (formValues: { [k: string]: FormDataEntryValue }) => {
    if (iframeRef.current) {
      setIframeDimensions({
        width: `${formValues.width}px`,
        height: `${formValues.height}px`,
      });

      iframeRef.current.src = `http://localhost:3000/embed/${clientId}?charts=${charts}&theme=${theme}&w=${formValues.width}&h=${formValues.height}`;
    }
  };

  const handleRefresh: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData);

    refreshIframe(formValues);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmbedCode("");
    const { name, checked } = e.target;

    if (checked) {
      setCharts((currentCharts) =>
        [...(currentCharts === "" ? [] : currentCharts.split(",")), name].join(
          ","
        )
      );
    } else {
      setCharts((currentCharts) =>
        currentCharts
          .split(",")
          .filter((chart) => chart !== name)
          .join(",")
      );
    }
  };

  const [copiedText, setCopiedText] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedText("Copied to Clipboard!");
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  };

  return (
    <Grid
      templateColumns={"minmax(100px, 320px) 1fr"}
      placeItems="center"
      h="100vh"
    >
      <GridItem
        w="full"
        h="full"
        bg="teal.900"
        overflow="auto"
        rowSpan={1}
        colSpan={1}
        p={8}
        pt={4}
        alignItems="center"
        gap={4}
        display="flex"
        flexDir="column"
      >
        <Heading>Embed Designer</Heading>
        <Flex as="form" flexDir="column" gap={2} onSubmit={handleRefresh}>
          <Text>Dimensions</Text>
          <InputGroup>
            <InputLeftAddon>Width</InputLeftAddon>
            <Input
              type="number"
              name="width"
              value={width}
              onChange={handleDimensionChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon>Height</InputLeftAddon>
            <Input
              type="number"
              name="height"
              value={height}
              onChange={handleDimensionChange}
            />
          </InputGroup>
          <Button type="submit">Refresh Dimensions</Button>
        </Flex>
        <Flex
          gap={2}
          alignItems="flex-start"
          w="full"
          justifyContent="space-between"
          flexDir="column"
        >
          <Text>Charts</Text>
          {chartTypes.map((chartType) => (
            <Checkbox
              name={chartType}
              id={chartType}
              key={chartType}
              onChange={handleChange}
              checked={charts.includes(chartType)}
            >
              {chartType}
            </Checkbox>
          ))}
        </Flex>
        <Box w="full">
          <Text>Theme</Text>
          <Flex alignItems="center" gap={2}>
            <ColorModeToggle onClick={handleThemeChange} override />
            <Text>{theme}</Text>
          </Flex>
        </Box>
        <Flex
          position="relative"
          flexDir="column"
          gap={2}
          w="full"
          justifyContent="space-around"
        >
          {embedCode ? (
            <>
              <Textarea rows={4} isDisabled value={embedCode} />
              <Button colorScheme="red" onClick={() => setEmbedCode("")}>
                Clear Code
              </Button>
              <Button onClick={handleCopy}>Copy Code</Button>
              {copiedText && (
                <Text
                  bg="blackAlpha.500"
                  p={4}
                  top={8}
                  left={8}
                  position="absolute"
                >
                  {copiedText}
                </Text>
              )}
            </>
          ) : (
            <Button colorScheme="teal" onClick={generateEmbedCode}>
              Generate Embed Code
            </Button>
          )}
        </Flex>
      </GridItem>
      <GridItem
        display="grid"
        placeItems="center"
        h="full"
        w="full"
        overflow="auto"
        colSpan={1}
      >
        <Box
          ref={iframeRef}
          h={iframeDimensions.height}
          w={iframeDimensions.width}
          as="iframe"
          src={`http://localhost:3000/embed/${clientId}?charts=${charts}&theme=${theme}&w=${iframeDimensions.width}&h=${iframeDimensions.height}`}
        />
      </GridItem>
    </Grid>
  );
}
