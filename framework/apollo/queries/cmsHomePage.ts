import { gql } from '@apollo/client'

const GET_CMS_HOMEPAGE_CONTENTFUL = gql`
  query nextHomepageEntryQuery($id: String!) {
    nextHomepage(id: $id) {
      sys {
        id
      }
      heroBannerCollection(limit: 5) {
        items {
          sys {
            id
          }
          title
          subtitle
          buttonText
          link
          image {
            desktopImage {
              url(transform: { format: WEBP })
            }
            mobileImage {
              url(transform: { format: WEBP })
            }
          }
        }
      }
      middleContentCollection {
        items {
          __typename
          ... on Next3ColumnMediumBanner {
            bannerCollection(limit: 5) {
              items {
                sys {
                  id
                }
                title
                subtitle
                image {
                  url(transform: { format: WEBP })
                }
              }
            }
          }
          ... on NextWideBanner {
            title
            subtitle
            paragraph
            buttonText
            buttonLink
            image {
              url(transform: { format: WEBP })
            }
          }
          ... on NextProductWidget {
            title
            productSku
          }
        }
      }
    }
  }
`

export { GET_CMS_HOMEPAGE_CONTENTFUL }
