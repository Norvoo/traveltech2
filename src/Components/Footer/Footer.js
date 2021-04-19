import React, { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import {
  FooterContainer,
  FooterWrap,
  FooterC,
  FooterTitle,
  FooterDescription,
  FooterLinksContainer,
  FooterLinkWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialIconLink,
  SocialIcon,
  SocialMediaWrap,
  SocialLogo,
  WebSiteRights,
} from "./FooterElement.js";
const Footer = () => {
  const [data, setData] = useState({ footerIcons: [], footerMenus: [] });

  useEffect(async () => {
    console.log("fetched");
    let result = await fetch("http://192.168.0.109/travel/api/app/footer");
    result = await result.json();
    setData(result);
  }, []);
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer key={data.id}>
          <FooterC>
            <FooterTitle>{data.name}</FooterTitle>

            <FooterDescription>{data.desc}</FooterDescription>
          </FooterC>

          <FooterLinkWrapper>
            {data.footerMenus.map((footer) => {
              return (
                <FooterLinkItems key={footer.id}>
                  <FooterLinkTitle>{footer.name}</FooterLinkTitle>
                  {footer.links.map((link) => {
                    return (
                      <div key={link.id}>
                        <FooterLink href={"https://www." + link.url}>
                          {link.name}
                        </FooterLink>
                      </div>
                    );
                  })}
                </FooterLinkItems>
              );
            })}
          </FooterLinkWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/">TRAVEL</SocialLogo>
            <WebSiteRights>
              TraVel &copy;{new Date().getFullYear()}All rights reserved
            </WebSiteRights>
            {data.footerIcons.map((icon) => {
              return (
                <SocialIcon key={icon.id}>
                  <SocialIconLink href={icon.url}>
                    <img
                      style={{ width: 100 }}
                      src={
                        "http://192.168.0.109/travel/wwwroot/Images/" +
                        icon.imageName
                      }
                    />
                  </SocialIconLink>
                </SocialIcon>
              );
            })}
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
