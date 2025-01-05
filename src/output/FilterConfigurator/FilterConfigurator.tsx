import { useAtom } from "jotai";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import { useStore } from "../../store/store";
import { FilterCard } from "./FilterCard";
import styled from "@emotion/styled";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const FilterConfiguratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const AddFilterButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  margin: 10px;
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
`;

const FilterCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`;

export const FilterConfigurator = () => {
  const { filters, addFilter } = useStore();
  const [columns] = useAtom(ColumnConfigAtom);

  return (
    <FilterConfiguratorContainer>
      <h2>Filters</h2>
      <AddFilterButton
        onClick={() =>
          addFilter({
            id: uuidv4(),
            column: columns[0],
            operator: "equals",
            value: "",
          })
        }
      >
        <MdAdd />
      </AddFilterButton>

      <FilterCardsContainer>
        {Object.entries(filters).map(([key, filter]) => (
          <FilterCard key={key} filter={filter} />
        ))}
      </FilterCardsContainer>
    </FilterConfiguratorContainer>
  );
};
