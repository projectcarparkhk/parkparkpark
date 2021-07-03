import { useState } from 'react';
import TabNav from "./TabNav";
import TabNavItem from "./TabNavItem";

export default function Tabs({ tabs }) {
  const [activeId, setAcitveId] = useState(0)

    return (
      <>
        <TabNav>
        {
          tabs?.map((item, i) => {
            return (
              <TabNavItem 
                id={i}
                isActive={i.toString() === activeId.toString()}
                onClick={e => setAcitveId(e.target.getAttribute('data-tab-id'))}
                >
                {item.label}
              </TabNavItem>
            )
          })
        }
        </TabNav>
        {tabs[activeId].panel}
      </>
    )
  }