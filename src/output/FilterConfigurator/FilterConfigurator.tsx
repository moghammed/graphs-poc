import { useAtom } from "jotai";
import { ColumnConfig, ColumnConfigAtom } from "../../input/ColumnConfig";
import { useStore } from "../../store/store";
import { FilterCard } from "./FilterCard";
import styled from "@emotion/styled";
import { MdAdd, MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const FilterConfiguratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const AddFilterButton = styled.button`
  margin: 10px;
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  border: 2px solid #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const FilterCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
  align-items: stretch;
`;

const FloatingContainer = styled.div`
  border: 2px solid #fff;
  position: fixed;
  top: 20px;
  right: 50%;
  transform: translate(50%, 0);
  width: 50%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  flex: 0 0 32px;
`;

export const getDefaultValue = (column: ColumnConfig) => {
  if (column.type === "boolean") {
    return false;
  }
  if (column.type === "date") {
    return new Date().toISOString().split("T")[0];
  }
  if (column.type === "number") {
    return 0;
  }
  if (column.type === "string") {
    return "";
  }
  return "";
};

export const FilterConfigurator = ({ close }: { close: () => void }) => {
  const { filters, addFilter } = useStore();
  const [columns] = useAtom(ColumnConfigAtom);

  return (
    <FloatingContainer>
      <HeaderContainer>
        <h2>Filters</h2>
        <CloseButton onClick={close}>
          <MdClose />
        </CloseButton>
      </HeaderContainer>
      <FilterConfiguratorContainer>
        <FilterCardsContainer>
          {Object.entries(filters).map(([key, filter]) => (
            <FilterCard key={key} filter={filter} />
          ))}
        </FilterCardsContainer>
        <AddFilterButton
          onClick={() =>
            addFilter({
              id: uuidv4(),
              column: columns[0],
              operator: "equals",
              value: getDefaultValue(columns[0]),
            })
          }
        >
          Add a new filter <MdAdd />
        </AddFilterButton>
      </FilterConfiguratorContainer>
    </FloatingContainer>
  );
};
