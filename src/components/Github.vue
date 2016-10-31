<style lang="less">
</style>

<template>
  <div>
    <div class="description">
      {{type}} <a :href='repo_url' target='_blank'>{{repo_name}}</a>
      <p v-html="issue_content">
      </p>
      <li v-for="commit in commits">
        <a target="_blank" :href="commit.url.replace('api.github.com/repos', 'github.com')">
          {{commit.message}}
        </a>
      </li>
      <p v-html="issue_comment_link">
      </p>
      <p v-show="issue_comment_body" v-html="issue_comment_body" class="word-wrap-bz"></p>
    </div>
  </div>
</template>

<script>
  // import store from '../store'
  import _ from 'underscore'
  export default {
    props: ['message'],
    computed: {
      repo_url: function () {
        return this.message.content.repo.url.replace('api.github.com/repos', 'github.com')
      },
      repo_name: function () {
        return this.message.content.repo.name
      },
      repo_link: function () {
        return '<a href="' + this.repo_url + '" target="_blank">' + this.repo_name + '</a>'
      },
      type: function () {
        return this.message.content.type
      },
      payload: function () {
        return this.message.content.payload
      },
      action: function () {
        return this.payload.action
      },
      commits: function () {
        return this.payload.commits
      },
      issue: function () {
        if (_.has(this.payload, 'issue')) {
          return this.payload.issue
        }
      },
      issue_link: function () {
        var issue_link
        if (this.issue) {
          issue_link = '<a target="_blank" href="' + this.issue.html_url + '" >' + this.issue.title + '</a>'
          return issue_link
        }
      },
      issue_content: function () {
        var content
        content = ''
        if (this.action) {
          content = this.action + ' ' + (this.issue_link || '')
          return content
        }
      },
      issue_comment_link: function () {
        var issue_comment_link, issue_comment_url
        if (this.issue) {
          if (!this.payload.comment) {
            return
          }
          issue_comment_url = this.payload.comment.html_url
          issue_comment_link = '<a target="_blank" href="' + issue_comment_url + '" >' + this.issue.title + '</a>'
          return issue_comment_link
        }
      },
      issue_comment_body: function () {
        if (_.has(this.payload, 'comment')) {
          return this.payload['comment']['body']
        }
      }
    }
  }
</script>
