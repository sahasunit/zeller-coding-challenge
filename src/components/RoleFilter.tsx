import styled from "styled-components";

const Group = styled.div`
    display: grid;
    gap: 8px;
`;

const Option = styled.label<{ $active: boolean }>`
    display: flex; 
    align-items: center;
    cursor: pointer;
    padding: 12px 14px;
    gap: 10px;
`;

const Radio = styled.input`
    accent-color: blue;
    width: 18px;
    height: 18px;
`;

type Props = {
    value: "ADMIN" | "MANAGER";
    onChange: (role: "ADMIN" | "MANAGER") => void;
}

const RoleFilter = ({value, onChange}: Props) => {
    return (
        <Group>
            <Option $active={value === "ADMIN"}>
                <Radio 
                    type="radio" 
                    name="role" 
                    value="Admin" 
                    checked={value === "ADMIN"} 
                    onChange={() => onChange("ADMIN")} 
                />
                Admin
            </Option>
            <Option $active={value === "MANAGER"}>
                <Radio 
                    type="radio" 
                    name="role" 
                    value="Manager" 
                    checked={value === "MANAGER"} 
                    onChange={() => onChange("MANAGER")} 
                />
                Manager
            </Option>
        </Group>
    )
}

export default RoleFilter;