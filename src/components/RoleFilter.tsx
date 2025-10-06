import styled from "styled-components";

const Group = styled.div`
    display: grid;
    gap: 8px;
`;

const Option = styled.label`
    display: flex; 
    align-items: center;
    cursor: pointer;
    padding: 12px 14px;
    gap: 10px;
`;

const Radio = styled.input`
    accent-color: #3b82f6;
    width: 18px;
    height: 18px;
`;

// Props type: value holds the current selection. 
// onChange is triggered when toggled
type Props = {
    value: "ADMIN" | "MANAGER";
    onChange: (role: "ADMIN" | "MANAGER") => void;
}


// RoleFilter renders two radio buttons (Admin & Manager)
// Controlled component: state comes from parent (App)
const RoleFilter = ({value, onChange}: Props) => {
    return (
        <Group>
            <Option>
                <Radio 
                    type="radio" 
                    name="role" 
                    value="Admin" 
                    checked={value === "ADMIN"} 
                    onChange={() => onChange("ADMIN")} 
                />
                Admin
            </Option>
            <Option>
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