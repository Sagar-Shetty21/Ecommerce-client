'use client'

import Center from "@components/Center";
import ColorOptions from "@components/ColorOptions";
import DimensionOptions from "@components/DimensionOptions";
import FrameDesignOptions from "@components/FrameDesignOptions";
import ProductDetailsCarousel from "@components/ProductImageCarousel";
import RelatedProducts from "@components/RelatedProducts";
import SizeOptions from "@components/SizeOptions";
import axios from "axios";
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useContext } from "react";
import { CartContext } from "@context/CartContext";
import toast from "react-hot-toast";
import FileInput from "@components/FileInput";
import TextInput from "@components/TextInput";

const Container = styled.div`
  width: 100%;
  font-family: "Urbanist", sans-serif;
  padding-top: 20px; /* You can use props for dynamic values if needed */
`;

const Wrapper = styled.div`
  /* Add your Wrapper styles here */
`;

const LeftColumn = styled.div`
  flex: 1.5;
  max-width: 500px;
  max-width: 100%;
  margin: auto;
  margin-right: 0;
`;

const RightColumn = styled.div`
  flex: 1;
  padding-top: 3px; /* Use props for dynamic values if needed */
  /* Add your RightColumn styles here */
`;

const ProductTitle = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: normal;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  /* Add your ProductPrice styles here */
`;

const TaxInfo = styled.div`
  font-size: 14px;
  font-weight: medium;
  color: rgba(0, 0, 0, 0.5);
  /* Add your TaxInfo styles here */
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
  
  padding-left: 10px;
  margin: 0 -25px; /* Adjust negative margin to match your design */
  
  & > * {
    margin: 0 25px; /* Adjust margin as needed */
  }
`;
const ProductDescTitle = styled.div`
  font-size: 1.25rem; /* Equivalent to text-lg */
  font-weight: bold;
  margin-bottom: .7rem; /* Equivalent to mb-5 */
`;
const ProductDescInfo = styled.div`
  font-size: 0.9rem; /* Equivalent to text-md */
  margin-bottom: 1.25rem; /* Equivalent to mb-5 */
`;
const AddToCartBtn = styled.button`
  width: 100%; /* Equivalent to w-full */
  padding: 1rem 0; /* Equivalent to py-4 */
  border-radius: 9999px; /* Equivalent to rounded-full */
  background-color: black;
  color: white;
  font-size: 1.25rem; /* Equivalent to text-lg */
  font-weight: 500; /* Equivalent to font-medium */
  transition: transform 0.2s, opacity 0.2s; /* Equivalent to transition-transform */
  cursor: pointer;
  margin-bottom: 1rem; /* Equivalent to mb-3 */
  margin-top: 1rem;

  &:hover {
    opacity: 0.75; /* Equivalent to hover:opacity-75 */
  }

  &:active {
    transform: scale(0.95); /* Equivalent to active:scale-95 */
  }
`;

const Shake = keyframes`
  0% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;


const ProductPage = () => {
    const {id} = useParams()
    const dimensionRef = useRef(null);
    const sizeRef = useRef(null);
    const colorRef = useRef(null);
    const frameRef = useRef(null);
    const fileRef = useRef(null);
    const messageRef = useRef(null);

    const {addToCart} = useContext(CartContext)

    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

    const [selectedDimension, setSelectedDimension] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedFrameDesign, setSelectedFrameDesign] = useState(null);
    const [customerFile, setCustomerFile] = useState(null);
    const [customerMessage, setCustomerMessage] = useState("");

    const [productPrice, setProductPrice] = useState("")

    useEffect(() => {
        const getProductInfo = axios.get(`/api/products?id=${id}`).then(response => {
            setProduct(response.data);
            setProductPrice(response.data.price)
        })
        const getRelatedProducts = axios.get(`/api/products/related`).then(response => {
            setRelatedProducts(response.data);
        })
    },[])

    const handleAddToCart = () => {
      if(product.properties?.dimensions?.length > 0 && !selectedDimension){
        dimensionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        dimensionRef.current.style.animation = `shake 0.8s ease-in-out`;
        setTimeout(() => {
          dimensionRef.current.style.animation = 'none';
        }, 800);
        toast.error('Please choose a dimension!')
      }else if(product.properties?.size?.length > 0 && !selectedSize){
        sizeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        sizeRef.current.style.animation = `shake 0.8s ease-in-out`;
        setTimeout(() => {
          sizeRef.current.style.animation = 'none';
        }, 800);
        toast.error('Please choose a size!')
      }else if(product.properties?.color?.length > 0 && !selectedColor){
        colorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        colorRef.current.style.animation = `shake 0.8s ease-in-out`;
        setTimeout(() => {
          colorRef.current.style.animation = 'none';
        }, 800);
        toast.error('Please choose a color!')
      }else if(product.properties?.frame?.length > 0 && !selectedFrameDesign){
        frameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        frameRef.current.style.animation = `shake 0.8s ease-in-out`;
        setTimeout(() => {
          frameRef.current.style.animation = 'none';
        }, 800);
        toast.error('Please choose a frame design!')
      }else if(product.isFileRequired && !customerFile){
        fileRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fileRef.current.style.animation = `shake 0.8s ease-in-out`;
        setTimeout(() => {
          fileRef.current.style.animation = 'none';
        }, 800);
        toast.error('Please add a file!')
      }else if(product.isCustomerInputRequired && !customerMessage ){
        messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        messageRef.current.style.animation = `shake 0.8s ease-in-out`;
        setTimeout(() => {
          messageRef.current.style.animation = 'none';
        }, 800);
        toast.error('Please add a message!')
      }else{
        const item = {
          id: id,
          title: product.title,
          image: product.images[0],
          price: productPrice,
          quantity: 1,
          properties: (!selectedDimension && !selectedSize && !selectedColor && !selectedFrameDesign && !customerFile && !customerMessage) ? null :
                      {
                        dimension: selectedDimension,
                        size: selectedSize,
                        color: selectedColor,
                        frameDesign: selectedFrameDesign,
                        customerFile: customerFile,
                        customerMessage: customerMessage
                      }
        }
        addToCart(item)

        setSelectedDimension(null);
        setSelectedSize(null);
        setSelectedColor(null);
        setSelectedFrameDesign(null);
        setCustomerFile(null);
        setCustomerMessage("");

        toast.success('Item added to cart')
      }
    }
    
    return(
        <Center>
            <Container>
                <Wrapper>
                    <StyledContainer>
                        <LeftColumn>
                            <ProductDetailsCarousel images={product.images}/>
                        </LeftColumn>

                        <RightColumn>
                            {/* PRODUCT TITLE */}
                            <ProductTitle>{product.title}</ProductTitle>

                            {/* PRODUCT PRICE */}
                            <ProductPrice>
                            MRP : &#8377;{productPrice}
                            </ProductPrice>

                            <TaxInfo>incl. of taxes</TaxInfo>
                            <TaxInfo>{`(Also includes all applicable duties)`}</TaxInfo>

                            {product.properties?.dimensions?.length > 0 && <DimensionOptions ref={dimensionRef} data={product.properties.dimensions} setSelectedDimension={setSelectedDimension} selectedDimension={selectedDimension} setProductPrice={setProductPrice} />}
                            {product.properties?.size?.length > 0 && <SizeOptions ref={sizeRef} data={product.properties.size} setSelectedSize={setSelectedSize} selectedSize={selectedSize} setProductPrice={setProductPrice} />}
                            {product.properties?.color?.length > 0 && <ColorOptions ref={colorRef} data={product.properties.color} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />}
                            {product.properties?.frame?.length > 0 && <FrameDesignOptions ref={frameRef} data={product.properties.frame} selectedFrameDesign={selectedFrameDesign} setSelectedFrameDesign={setSelectedFrameDesign} />}
                            {product.isFileRequired && <FileInput ref={fileRef} customerFile={customerFile} setCustomerFile={setCustomerFile} />}
                            {product.isCustomerInputRequired && <TextInput ref={messageRef} customerMessage={customerMessage} setCustomerMessage={setCustomerMessage} />}

                            <AddToCartBtn onClick={handleAddToCart}>Add to Cart</AddToCartBtn>

                            <div>
                                <ProductDescTitle>Product Details</ProductDescTitle>
                                <ProductDescInfo>
                                    {product.description}
                                </ProductDescInfo>
                            </div>
                        </RightColumn>
                    </StyledContainer>

                    {relatedProducts?.length > 0 && <RelatedProducts products={relatedProducts} />}
                </Wrapper>
            </Container>
        </Center>
    )
}

export default ProductPage;
