import { StructuredDataFailure } from "schemarama/shaclValidator";
import { SchemaValidationResult, SchemaValidator } from "../scripts/schemarama-wrapper";

/* eslint-disable max-len */
const yoastDotComSchema = `{
   "@context":"https://schema.org",
   "@graph":[
      {
         "@type":"Organization",
         "@id":"https://yoast.com/#organization",
         "name":"Yoast",
         "url":"https://yoast.com/",
         "sameAs":[
            "https://www.facebook.com/yoast",
            "https://www.instagram.com/yoast/",
            "https://www.linkedin.com/company/1414157/",
            "https://www.youtube.com/yoast",
            "https://www.pinterest.com/yoast/",
            "https://en.wikipedia.org/wiki/Yoast",
            "https://twitter.com/yoast"
         ],
         "logo":{
            "@type":"ImageObject",
            "@id":"https://yoast.com/#logo",
            "inLanguage":"en-US",
            "url":"https://yoast.com/app/uploads/2020/09/Yoast_Icon_SocialMedia_500x500.png",
            "width":500,
            "height":500,
            "caption":"Yoast"
         },
         "image":{
            "@id":"https://yoast.com/#logo"
         },
         "founder":{
            "@type":"Person",
            "name":"Joost de Valk",
            "url":"https://yoast.com/about-us/team/joost-de-valk/",
            "sameAs":"https://yoast.com/about-us/team/joost-de-valk/"
         },
         "slogan":"SEO for Everyone",
         "description":"Yoast helps you with your website optimization, whether it be through our widely used SEO software or our online SEO courses: we&#039;re here to help.",
         "legalName":"Yoast BV"
      },
      {
         "@type":"WebSite",
         "@id":"https://yoast.com/#website",
         "url":"https://yoast.com/",
         "name":"Yoast",
         "description":"SEO for everyone",
         "publisher":{
            "@id":"https://yoast.com/#organization"
         },
         "potentialAction":[
            {
               "@type":"SearchAction",
               "target":"https://yoast.com/?s={search_term_string}",
               "query-input":"required name=search_term_string"
            }
         ],
         "inLanguage":"en-US",
         "copyrightHolder":{
            "@id":"https://yoast.com/#organization"
         }
      },
      {
         "@type":"WebPage",
         "@id":"https://yoast.com/#webpage",
         "url":"https://yoast.com/",
         "name":"SEO for everyone &bull; Yoast",
         "isPartOf":{
            "@id":"https://yoast.com/#website"
         },
         "about":{
            "@id":"https://yoast.com/#organization"
         },
         "datePublished":"2015-09-14T08:13:22+00:00",
         "dateModified":"2021-03-02T08:35:35+00:00",
         "description":"Yoast helps you with your website optimization, whether it be through our widely used SEO software or our online SEO courses: we're here to help.",
         "inLanguage":"en-US",
         "potentialAction":[
            {
               "@type":"ReadAction",
               "target":[
                  "https://yoast.com/"
               ]
            }
         ]
      }
   ]
}`;
const brokenYoastDotComSchema = `{
   "@context":"https://schema.org",
   "@graph":[
      {
         "@type":"Organization",
         "@id":"https://yoast.com/#organization",
         "name":"Yoast",
         "url":"https://yoast.com/",
         "sameAs":[
            "https://www.facebook.com/yoast",
            "https://www.instagram.com/yoast/",
            "https://www.linkedin.com/company/1414157/",
            "https://www.youtube.com/yoast",
            "https://www.pinterest.com/yoast/",
            "https://en.wikipedia.org/wiki/Yoast",
            "https://twitter.com/yoast"
         ],
         "logo":{
            "@type":"ImageObject",
            "@id":"https://yoast.com/#logo",
            "inLanguage":"en-US",
            "url": { 
                "broken_schema": true
            },
            "width": 500,
            "height":500,
            "caption":"Yoast"
         },
         "image":{
            "@id":"https://yoast.com/#logo"
         },
         "founder":{
            "@type":"Person",
            "name":"Joost de Valk",
            "url":"https://yoast.com/about-us/team/joost-de-valk/",
            "sameAs":"https://yoast.com/about-us/team/joost-de-valk/"
         },
         "foundingDate":"2010-05-01",
         "numberOfEmployees":133,
         "slogan":"SEO for Everyone",
         "description":"Yoast helps you with your website optimization, whether it be through our widely used SEO software or our online SEO courses: we&#039;re here to help.",
         "legalName":"Yoast BV"
      },
      {
         "@type":"ThisTypeDoesNotExist_WebSite",
         "@id":"https://yoast.com/#website",
         "url":"https://yoast.com/",
         "name":"Yoast",
         "description":"SEO for everyone",
         "publisher":{
            "@id":"https://yoast.com/#organization"
         },
         "potentialAction":[
            {
               "@type":"SearchAction",
               "target":"https://yoast.com/?s={search_term_string}",
               "query-input":"required name=search_term_string"
            }
         ],
         "inLanguage":"en-US",
         "copyrightHolder":{
            "@id":"https://yoast.com/#organization"
         }
      },
      {
         "@type":"WebPage",
         "@id":"https://yoast.com/#webpage",
         "url":"https://yoast.com/",
         "name":"SEO for everyone &bull; Yoast",
         "isPartOf":{
            "@id":"https://yoast.com/#website"
         },
         "about":{
            "@id":"https://yoast.com/#organization"
         },
         "datePublished":"2015-09-14T08:13:22+00:00",
         "dateModified":"2021-03-02T08:35:35+00:00",
         "description":"Yoast helps you with your website optimization, whether it be through our widely used SEO software or our online SEO courses: we're here to help.",
         "breadcrumb":{
            "@id":"https://yoast.com/#breadcrumb"
         },
         "inLanguage":"en-US",
         "potentialAction":[
            {
               "@type":"ReadAction",
               "target":[
                  "https://yoast.com/"
               ]
            }
         ]
      },
      {
         "@type":"BreadcrumbList",
         "@id":"https://yoast.com/#breadcrumb",
         "itemListElement":[
            {
               "@type":"ListItem",
               "position":1,
               "item":{
                  "@type":"WebPage",
                  "@id":"https://yoast.com/",
                  "url":"https://yoast.com/",
                  "name":"Home"
               }
            }
         ]
      }
   ]
}`;
/* eslint-enable max-len */

/* eslint-disable no-undefined */
const expectedValidationErrors: StructuredDataFailure[] = [
	{
		message: "Value does not have datatype <http://www.w3.org/2001/XMLSchema#date>",
		property: "http://schema.org/foundingDate",
		severity: "error",
		shape: "http://schema.org/Organization",
	} as StructuredDataFailure,
	{
		message: undefined,
		property: "http://schema.org/numberOfEmployees",
		severity: "error",
		shape: "http://schema.org/Organization",
	} as StructuredDataFailure,
	{
		message: undefined,
		property: "http://schema.org/item",
		severity: "error",
		shape: "http://schema.org/ListItem",
	},
];
/* eslint-enable no-undefined */

describe( "The SchemaValidator class", () => {
	it( "Validates Yoast.com schema against the default schema shapes and finds no errors.", async () => {
		const validator = new SchemaValidator();
		const result = await validator.validate( yoastDotComSchema, "https:/yoast.com" );

		const expected: SchemaValidationResult = {
			severity: "success",
			failures: [],
		};
		expect( result ).toEqual( expected );
	} );

	it( "Validates broken schema against the default schema shapes and finds that an Image URL is an object instead of a string.", async () => {
		const validator = new SchemaValidator();
		const result = await validator.validate( brokenYoastDotComSchema, "https:/yoast.com" );

		const expected: SchemaValidationResult = {
			severity: "error",
			failures: expectedValidationErrors,
		};
		expect( result ).toEqual( expected );
	} );
} );
