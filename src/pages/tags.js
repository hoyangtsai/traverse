import React from "react"
import PropTypes from "prop-types"

// Utilities
import { kebabCase } from "lodash"

// Components
import { Link, graphql } from "gatsby"

import Layout from "components/Layout"
import Seo from "components/seo"

const TagsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Tags`
  const tags = data.allMarkdownRemark?.group || []

  return (
    <Layout title={siteTitle} location={location}>
      <Seo title="Tags" />
      <div className="tags-container">
        <h1>Tags</h1>
        <ul>
          {tags.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )   
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`