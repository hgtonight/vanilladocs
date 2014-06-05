_ = require 'underscore'
_.str = require 'underscore.string'

_.mixin _.str.exports()

class MenuTree
  constructor: (@collection, @context) ->
    @documents = {}

    # Construct a nested hash of all the documents in collection
    for doc in @collection
      # Remove trailing slash from the URL and split it into an array
      parts = _.compact doc.url.replace(/^\//, '').split('/')

      continue if not parts.length

      addChild = (parent, index) ->
        part = parts[index]

        # Intialize the new context if it doesn't exist
        current = parent[part] = parent[part] or { children: {} }

        # If this is the current document context, add the document meta
        if parts.length - 1 is index
          current.title  = doc.title or doc.menu
          current.url    = doc.url
          current.order  = doc.order or 0
          current.hidden = doc.hidden or false
        # Otherwise, assume that this page has children
        else
          addChild current.children, index + 1

      # Recursively construct the nested hash
      addChild @documents, 0 for part in parts

  toJSON: ->
    self = @
    output = []

    addDocument = (parent, current) ->
      # Push the current doc onto the parent
      parent.push current if not current.hidden

      # Mark documents in the current navigation path as active
      current.active = _.startsWith(self.context.url, current.url)

      # Grab all child documents of the current document and sort them
      children = _.sortBy current.children, (doc) -> parseFloat doc.order

      return delete current.children if _.isEmpty children

      # Re-initialize document children as array
      current.children = []

      addDocument current.children, doc for section, doc of children

    addDocument output, doc for section, doc of @documents

    return output

module.exports = (BasePlugin) ->
  class MenuPlugin extends BasePlugin
    name: "menu"

    extendTemplateData: ({templateData}) ->
      docpad = @docpad

      templateData.menu = (context, collection = "documents") ->
        # Get all documents from the collection
        collection = docpad.getCollection(collection)

        # Construct the menu tree
        tree = new MenuTree collection.toJSON(), context

        tree.toJSON()
