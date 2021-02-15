import React from "react"
import ContentLoader from "react-content-loader"
import { generetList } from "../../../../core/utils/list";

const ProductCardLoader = () => {
  const loaderItems = generetList(7);
  return (
    <>
      {loaderItems.map(item => (
        <ContentLoader 
          key={item}
          speed={2}
          width={250}
          height={333}
          viewBox="0 0 250 333"
          backgroundColor="#ecebeb"
          foregroundColor="#d6d2d2"
        >
          <rect x="0" y="60" rx="10" ry="10" width="250" height="333" />
          </ContentLoader>
          ))}
        </>
      )
    }
      
    export default ProductCardLoader
       