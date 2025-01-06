import { useAtom } from "jotai";
import { ColumnConfigAtom } from "../../input/ColumnConfig";
import { Filter, FilterOperator, useStore } from "../../store/store";
import styled from "@emotion/styled";
import { getOperators } from "../../util/operators";
import { useMemo } from "react";
import { dataAtom } from "../../input";
import { uniq } from "ramda";
import { getInput } from "../../util/inputs";
import { MdDelete } from "react-icons/md";

const FilterCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  gap: 5px;
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
`;

export const FilterCard = ({ filter }: { filter: Filter }) => {
  const columnType = filter.column.type;

  const [data] = useAtom(dataAtom);

  const availableOperators = getOperators(columnType);

  const { updateFilter, removeFilter } = useStore();
  const [columns] = useAtom(ColumnConfigAtom);

  const uniqueValues = useMemo(() => {
    return uniq(data.map((d) => d[filter.column.name]));
  }, [data, filter.column.name]);

  return (
    <FilterCardContainer>
      <select
        value={filter.column.name}
        onChange={(e) =>
          updateFilter(filter.id, {
            ...filter,
            column: columns.find((c) => c.name === e.target.value)!,
          })
        }
      >
        {columns.map((column) => (
          <option key={column.name} value={column.name}>
            {column.name}
          </option>
        ))}
      </select>
      <select
        value={filter.operator}
        onChange={(e) =>
          updateFilter(filter.id, {
            ...filter,
            operator: e.target.value as FilterOperator,
          })
        }
      >
        {availableOperators.map((operator) => (
          <option key={operator} value={operator as FilterOperator}>
            {operator}
          </option>
        ))}
      </select>
      {getInput(filter, (value) =>
        updateFilter(filter.id, { ...filter, value })
      )(uniqueValues)}
      <DeleteButton onClick={() => removeFilter(filter.id)}>
        <MdDelete />
      </DeleteButton>
    </FilterCardContainer>
  );
};
