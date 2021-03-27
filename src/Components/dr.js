import React, { useState, useEffect } from "react";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinkWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
} from "./dp.js";
export default function Dr() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinkWrapper>
            {item.Menu.Drop.map((i) => {
              return (
                <FooterLinkItems>
                  <FooterLinkTitle>{i.name}</FooterLinkTitle>
                  <FooterLink to="/">{item.desc}</FooterLink>
                </FooterLinkItems>
              );
            })}
          </FooterLinkWrapper>
        </FooterLinksContainer>
      </FooterWrap>
    </FooterContainer>
  );
}
