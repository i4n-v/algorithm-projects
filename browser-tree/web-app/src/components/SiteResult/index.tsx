import { Box, BoxProps, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../axios";
type SiteResultProps = {
  id?: string;
  url: string;
  favicon_url: string;
  title: string;
  description: string;
  index: number;
} & BoxProps;
export default function SiteResult({
  description,
  favicon_url,
  title,
  url,
  sx,
  index,
  ...rest
}: SiteResultProps) {
  const [iconUrl, setIconUrl] = useState<string>();

  useEffect(() => {
    const regex = RegExp("^http");
    if (!favicon_url) {
      setIconUrl("https://img.icons8.com/?size=256&id=2963&format=png");
    } else if (!regex.test(favicon_url)) {
      setIconUrl("https://img.icons8.com/?size=256&id=2963&format=png");
    } else {
      setIconUrl(favicon_url);
    }
  }, [favicon_url]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginLeft: "100%",
          animation: `slideFromRight 0.5s ease-in-out ${
            index * 0.01
          }s forwards`,
          ...sx,
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            width: "100%",
            paddingBottom: "30px",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              minWidth: "50px",
              minHeight: "50px",
              maxHeight: "50px",
              maxWidth: "50px",
              backgroundColor: "white",
              borderRadius: "50% ",
              border: "solid 3px white",
              "& img": {
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              },
            }}
          >
            <img src={iconUrl} />
          </Box>
          <Box sx={{ width: "calc(100% - 60px)", textAlign: "justify" }}>
            <Typography
              sx={{
                fontSize: "1.1rem",
                maxHeight: "50px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>
            <Typography sx={{ color: "#7211d9", fontSize: "0.85rem" }}>
              {url}
            </Typography>
            <Typography
              sx={{ fontSize: "0.92rem", whiteSpace: "break-spaces" }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "white" }} />
      </Box>
    </>
  );
}
