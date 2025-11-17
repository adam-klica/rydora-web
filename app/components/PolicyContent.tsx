"use client";

import React from "react";

interface PolicyContentProps {
  content: string;
}

export default function PolicyContent({ content }: PolicyContentProps) {
  // Split content into lines
  const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');
  
  const formattedContent: React.ReactElement[] = [];
  let currentParagraph: string[] = [];
  let listItems: string[] = [];
  let inList = false;
  let previousLineEndedWithColon = false;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const paraText = currentParagraph.join(' ');
      if (paraText.length > 0) {
        formattedContent.push(
        <p 
          key={`para-${formattedContent.length}`} 
          className="mb-8 leading-relaxed"
          style={{ 
            color: "rgba(203, 213, 225, 0.9)",
            fontSize: "16px",
            lineHeight: "1.9",
          }}
        >
          {paraText}
        </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      formattedContent.push(
        <ul 
          key={`list-${formattedContent.length}`} 
          className="mb-10 ml-2 space-y-4 list-none"
          style={{ color: "rgba(203, 213, 225, 0.9)" }}
        >
          {listItems.map((item, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-4"
              style={{ fontSize: "16px", lineHeight: "1.8" }}
            >
              <span 
                className="flex-shrink-0 w-2 h-2 rounded-full mt-2" 
                style={{ backgroundColor: "rgba(148, 163, 184, 0.8)" }}
              ></span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
      previousLineEndedWithColon = false;
    }
  };

  lines.forEach((line, index) => {
    // Skip title lines (all caps, short, no numbers, not a section, not a list item)
    if (
      line === line.toUpperCase() && 
      line.length < 80 && 
      !line.match(/^\d/) && 
      !line.includes('(') &&
      !line.match(/^[A-Z][a-z]/) // Not mixed case
    ) {
      return;
    }

    // Check if it's a main section heading (e.g., "1. INTRODUCTION")
    const mainSectionMatch = line.match(/^(\d+)\.\s+([A-Z][A-Z\s&–\-:()]+)$/);
    if (mainSectionMatch && line.length < 100) {
      flushList();
      flushParagraph();
      const isFirstSection = formattedContent.length === 0;
      formattedContent.push(
        <div key={`heading-wrapper-${index}`} className={`${isFirstSection ? 'mt-4' : 'mt-20'} mb-8`}>
          <h2 
            className="text-3xl md:text-4xl font-bold text-center pb-6 border-b"
            style={{ 
              color: "#fff",
              borderBottomColor: "rgba(51, 65, 85, 0.6)",
              borderBottomWidth: "2px",
              letterSpacing: "0.02em",
            }}
          >
            {line}
          </h2>
        </div>
      );
      return;
    }

    // Check if it's a subsection heading (e.g., "1.1. Subheading")
    const subSectionMatch = line.match(/^(\d+)\.(\d+)\.\s+(.+)$/);
    if (subSectionMatch) {
      flushList();
      flushParagraph();
      formattedContent.push(
        <div key={`subheading-wrapper-${index}`} className="mt-12 mb-6">
          <h3 
            className="text-xl md:text-2xl font-semibold"
            style={{ 
              color: "#fff",
              letterSpacing: "0.01em",
            }}
          >
            {line}
          </h3>
        </div>
      );
      return;
    }

    // Check if it's a sub-subsection heading (e.g., "1.1.1. Sub-subheading")
    const subSubSectionMatch = line.match(/^(\d+)\.(\d+)\.(\d+)\.\s+(.+)$/);
    if (subSubSectionMatch) {
      flushList();
      flushParagraph();
      formattedContent.push(
        <div key={`subsubheading-wrapper-${index}`} className="mt-10 mb-5">
          <h4 
            className="text-lg md:text-xl font-semibold"
            style={{ 
              color: "rgba(255, 255, 255, 0.95)",
              letterSpacing: "0.01em",
            }}
          >
            {line}
          </h4>
        </div>
      );
      return;
    }

    // Check if line ends with colon - likely introducing a list
    if (line.endsWith(':') && line.length < 150) {
      flushList();
      flushParagraph();
      previousLineEndedWithColon = true;
      // Add the line as a label/intro
      formattedContent.push(
        <p 
          key={`label-${index}`} 
          className="mb-6 font-semibold"
          style={{ 
            color: "rgba(255, 255, 255, 0.95)",
            fontSize: "18px",
            letterSpacing: "0.01em",
          }}
        >
          {line}
        </p>
      );
      return;
    }

    // Check if it's a list item (starts with dash, bullet, or is a short line)
    const isListItem = 
      line.startsWith('-') || 
      line.startsWith('•') ||
      line.startsWith('*') ||
      // If previous line ended with colon, treat short lines as list items
      (previousLineEndedWithColon && line.length < 150 && !line.match(/^\d/) && !line.includes('.')) ||
      // Short lines that look like list items (no periods, starts with lowercase or short uppercase)
      (line.length > 0 && line.length < 120 && 
       !line.match(/^\d/) && 
       (line.match(/^[a-z]/) || (line.match(/^[A-Z]/) && line.length < 50)) &&
       !line.includes('.') && 
       !line.includes('(') &&
       !line.match(/^[A-Z]{3,}$/)); // Not long all caps

    // Check if it's a continuation of a list (short line after a list item)
    const isListContinuation = inList && line.length < 150 && !line.match(/^\d/) && !line.includes('.');

    if (isListItem || isListContinuation) {
      if (!inList) {
        flushParagraph();
        inList = true;
      }
      const cleanItem = line.replace(/^[-•*]\s*/, '').trim();
      if (cleanItem) {
        listItems.push(cleanItem);
      }
      previousLineEndedWithColon = false;
      return;
    }

    // If we were in a list and now we're not, flush the list
    if (inList && !isListItem && !isListContinuation) {
      flushList();
    }

    // Regular paragraph content
    if (line.length > 0) {
      previousLineEndedWithColon = false;
      currentParagraph.push(line);
      
      // Flush paragraph if it ends with punctuation and is substantial
      if (line.match(/[.!?]$/) && currentParagraph.join(' ').length > 150) {
        flushParagraph();
      }
    }
  });

  // Flush any remaining content
  flushList();
  flushParagraph();

  return (
    <div className="policy-content">
      {formattedContent}
    </div>
  );
}
