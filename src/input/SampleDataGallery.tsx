import styled from "@emotion/styled";

const SampleDataContainer = styled.div`
  margin-top: 100px;
`;

const SampleDataFlexContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SampleDataCard = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  gap: 10px;

  h3 {
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin-bottom: 10px;
  }
`;

const Heading2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const SourceLink = styled.a`
  color: #0070f3;
  text-decoration: none;
  cursor: pointer;
`;

const SuggestedCharts = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const SuggestedChart = styled.span`
  font-weight: 600;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 2px 5px;
`;

export const SampleDataGallery = ({
  parseFile,
}: {
  parseFile: (file: File | string) => void;
}) => {
  return (
    <SampleDataContainer>
      <Heading2>Or try out some sample data:</Heading2>
      <SampleDataFlexContainer>
        <SampleDataCard
          onClick={() => {
            const url = `${window.location.protocol}//${window.location.host}/datasets/kobe.tsv`;
            console.log("url", url);
            parseFile(url);
            console.log("clicked");
          }}
        >
          <h3>Kobe Bryant Shots</h3>
          <p>
            Over 1000 shots by Kobe Bryant. Contains X, Y coordinates, shot
            distance, shot type and outcome.
          </p>
          <div>
            <span>Suggested charts:</span>
            <SuggestedCharts>
              <SuggestedChart>Bubble Chart</SuggestedChart>
            </SuggestedCharts>
          </div>

          <SourceLink href="https://www.kaggle.com/c/kobe-bryant-shot-selection/">
            Source: Kaggle
          </SourceLink>
        </SampleDataCard>

        <SampleDataCard
          onClick={() => {
            const url = `${window.location.protocol}//${window.location.host}/datasets/medals.tsv`;
            parseFile(url);
          }}
        >
          <h3>Olympic Medals</h3>
          <p>
            Summer Olympic medals by country between 1896 and 2012. Contains
            country, macoArea, year and number of medals.
          </p>
          <div>
            <span>Suggested charts:</span>
            <SuggestedCharts>
              <SuggestedChart>Bar Chart</SuggestedChart>
              <SuggestedChart>Pie Chart</SuggestedChart>
            </SuggestedCharts>
          </div>

          <SourceLink href="https://www.kaggle.com/datasets/divyansh22/summer-olympics-medals">
            Source: Kaggle
          </SourceLink>
        </SampleDataCard>
      </SampleDataFlexContainer>
    </SampleDataContainer>
  );
};
