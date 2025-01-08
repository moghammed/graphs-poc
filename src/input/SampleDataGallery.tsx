import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Chip,
  Stack,
} from "@mui/material";

export const SampleDataGallery = ({
  parseFile,
}: {
  parseFile: (file: File | string) => void;
}) => {
  return (
    <Box sx={{ mt: 12 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Or try out some sample data:
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        If you're new here, we recommend starting with the Olympic Medals
        dataset.
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 32 }}>
        👇
      </Typography>
      <Box
        sx={{ mt: 2, display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <Card
          sx={{
            m: 1,
            width: 300,
            cursor: "pointer",
            "&:hover": {
              boxShadow: 6,
            },
          }}
          onClick={() => {
            const url = `${window.location.protocol}//${window.location.host}/datasets/kobe.tsv`;
            parseFile(url);
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Kobe Bryant Shots
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Over 1000 shots by Kobe Bryant. Contains X, Y coordinates, shot
              distance, shot type and outcome.
            </Typography>
            <Box>
              <Typography variant="body2">Suggested charts:</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip label="Bubble Chart" size="small" />
              </Stack>
            </Box>
            <Link
              href="https://www.kaggle.com/c/kobe-bryant-shot-selection/"
              sx={{ mt: 2, display: "block" }}
            >
              Source: Kaggle
            </Link>
          </CardContent>
        </Card>

        <Card
          className="highlight"
          sx={{
            m: 1,
            width: 300,
            cursor: "pointer",
            "&:hover": {
              boxShadow: 6,
            },
          }}
          onClick={() => {
            const url = `${window.location.protocol}//${window.location.host}/datasets/medals.tsv`;
            parseFile(url);
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Olympic Medals
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Summer Olympic medals by country between 1896 and 2012. Contains
              country, macoArea, year and number of medals.
            </Typography>
            <Box>
              <Typography variant="body2">Suggested charts:</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip label="Bar Chart" size="small" />
                <Chip label="Pie Chart" size="small" />
              </Stack>
            </Box>
            <Link
              href="https://www.kaggle.com/datasets/divyansh22/summer-olympics-medals"
              sx={{ mt: 2, display: "block" }}
            >
              Source: Kaggle
            </Link>
          </CardContent>
        </Card>
        <Card
          sx={{
            m: 1,
            width: 300,
            cursor: "pointer",

            "&:hover": {
              boxShadow: 6,
            },
          }}
          onClick={() => {
            const url = `${window.location.protocol}//${window.location.host}/datasets/bikeIndexData.csv`;
            parseFile(url);
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Stolen Bikes
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              50000 entries from Bike Index, a database of stolen bikes.
              Contains geocoordinates of locations where the bike was stolen and
              where it was found as well as other information.
            </Typography>
            <Box>
              <Typography variant="body2">Suggested charts:</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip label="Bar Chart" size="small" />
                <Chip label="Map" size="small" />
              </Stack>
            </Box>
            <Link
              href="https://www.kaggle.com/datasets/misterriley/bike-index"
              sx={{ mt: 2, display: "block" }}
            >
              Source: Kaggle
            </Link>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
