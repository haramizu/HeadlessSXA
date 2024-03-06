import React from "react";
import { useSitecoreContext } from "@sitecore-jss/sitecore-jss-nextjs";

interface Ancestor {
  field: {
    value: string;
  };
  url: {
    path: string;
  };
}

interface Fields {
  data: {
    item: {
      ancestors: Ancestor[];
    };
  };
}

type BreadcrumbProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: BreadcrumbProps): JSX.Element => {
  const data = props.fields?.data;
  const styles = `component breadcrumb ${props.params.styles}`.trimEnd();
  const id = props.params.RenderingIdentifier;

  const { sitecoreContext } = useSitecoreContext();
  const locale = sitecoreContext.language || "en";

  if (data) {
    return (
      <>
        <div className="component-content">
          {generateBreadcrumbList(data.item.ancestors, locale)}
        </div>
      </>
    );
  }

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <div>No Item </div>
        <div>id: {sitecoreContext.itemId}</div>
      </div>
    </div>
  );
};

function generateBreadcrumbList(
  ancestors: Ancestor[],
  locale: string
): JSX.Element {
  // Reverse the ancestors array
  const reversedAncestors = ancestors.reverse();

  // check locale and create base Url
  const baseUrl = locale === "en" ? "" : `/${locale}`;

  const ancestorListItems = reversedAncestors.map(
    (ancestor: Ancestor, index: number) => {
      return (
        <li key={index}>
          <a href={baseUrl + ancestor.url.path}>{ancestor.field.value}</a>
        </li>
      );
    }
  );

  // Wrap the list items with ul tags and return the JSX element
  return <ul>{ancestorListItems}</ul>;
}
