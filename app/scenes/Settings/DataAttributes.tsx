import { observer } from "mobx-react";
import { DigitalIcon } from "outline-icons";
import * as React from "react";
import { useTranslation, Trans } from "react-i18next";
import DataAttribute from "~/models/DataAttribute";
import { Action } from "~/components/Actions";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import PaginatedList from "~/components/PaginatedList";
import Scene from "~/components/Scene";
import Text from "~/components/Text";
import { createDataAttribute } from "~/actions/definitions/dataAttributes";
import useActionContext from "~/hooks/useActionContext";
import useCurrentTeam from "~/hooks/useCurrentTeam";
import usePolicy from "~/hooks/usePolicy";
import useStores from "~/hooks/useStores";
import { DataAttributeListItem } from "./components/DataAttributeListItem";

function DataAttributes() {
  const team = useCurrentTeam();
  const { t } = useTranslation();
  const { dataAttributes } = useStores();
  const can = usePolicy(team);
  const context = useActionContext();

  return (
    <Scene
      title={t("Data Attributes")}
      icon={<DigitalIcon />}
      actions={
        <>
          {can.createDataAttribute && (
            <Action>
              <Button
                type="submit"
                value={`${t("New Attribute")}…`}
                action={createDataAttribute}
                context={context}
              />
            </Action>
          )}
        </>
      }
    >
      <Heading>{t("Data Attributes")}</Heading>
      <Text as="p" type="secondary">
        <Trans>
          Attributes allow you to define data to be stored with your documents.
          They can be used to store custom properties, metadata, or any other
          structured information that is common across documents.
        </Trans>
      </Text>
      <PaginatedList
        fetch={dataAttributes.fetchAll}
        items={dataAttributes.orderedData}
        renderItem={(dataAttribute: DataAttribute) => (
          <DataAttributeListItem
            key={dataAttribute.id}
            dataAttribute={dataAttribute}
          />
        )}
      />
    </Scene>
  );
}

export default observer(DataAttributes);