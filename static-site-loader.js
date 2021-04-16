var pathUtil = require('path');
var marked = require('marked');
var toc = require('markdown-toc');

var jade = require('jade');
var RSS = require('rss');
var version = require('package')(__dirname).version;

var notJadeContent = [];
var template;
var mdtemplate;
var feedURLs;

toc_start = `
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#toc" href="#toc" aria-expanded="false" aria-controls="toc">
        Table of Contents
        </a>
      </h4>
    </div>
    <div id="toc" class="panel-collapse collapse" role="tabpanel" aria-labelledby="toc">
      <div class="panel-body">`;
toc_end = `
      </div>
    </div>
  </div>
</div>`;

module.exports = {
  //perform any preprocessing tasks you might need here.
  preProcess: function(source, path) { //source
    //watch the content directory for changes
    this.addContextDependency(path);
    //Define our template path
    var templatePath = 'templates/default.jade';
    var mdtemplatePath = 'templates/markdown.jade';
    //watch the template for changes
    this.addDependency(templatePath);
    this.addDependency(mdtemplatePath);
    //Compile the template for use later
    template = jade.compileFile(templatePath, { pretty: false });
    mdtemplate = jade.compileFile(mdtemplatePath, { pretty: false });
    // clear out shared vars for new run
    notJadeContent = [];
    feedURLs = [];
  },
  //Test if a file should be processed or not, should return true or false;
  testToInclude: function(path) { // stats, absPath
    return pathUtil.extname(path) === '.md' || pathUtil.extname(path) === '.jade';
  },
  //allows you to rewrite the url path that this will be uploaded to
  rewriteUrlPath: function(path, stats, absPath) {
    var extensionSize;
    if (pathUtil.extname(path) === '.md') {
      extensionSize = -3;
    } else {
      extensionSize = -5;
      this.addDependency(absPath);
    }

    //strip out the extension
    var urlPath = path.slice(0, extensionSize);

    //rewrite /index to be just /, making index.md files become the folder index properly
    urlPath = urlPath.replace('index', '');

    //store these for later
    if (extensionSize === -3) {
      notJadeContent.push(urlPath);
    }

    if (urlPath.substring(0, 3) === 'feedtest'
    && urlPath.length > 4 && urlPath !== 'feedtest/template') {
      feedURLs.push(urlPath);
    }

    return urlPath;
  },

  processFile: function(file, content, callback) {
    var ensureCritical = function(ensureContent) {
      /* critical.generate({
        base: 'built/',
        html: ensureContent,
        width: 1920,
        height: 1080,
        // inline: true,
        minify: true,
      }, function (err, output) {
        callback(output);
      });
      */
      callback(ensureContent);
    };

    if (pathUtil.extname(file.absPath) === '.md') { //this is a regular markdown file
      //Assemeble some meta data to use in template
      //match pico header info
      //see https://github.com/picocms/Pico/blob/v1.0.0-beta.2/lib/Pico.php#L760
      var picoCMSMetaPattern = /^\/\*(([\s\S])*?)\*\//;
      var meta = {};
      var temp = content.match(picoCMSMetaPattern);
      temp[1].split(/\r?\n/).forEach(function(value) {
        var row = value.split(':');
        meta[row[0]] = row[1];
      });

      // generate toc
      var markdownContent = content.replace(picoCMSMetaPattern, '');
      var tocHTML = toc_start + marked(toc(markdownContent).content) + toc_end;
      // markdownContent = markdownContent.replace('[[TOC]]', tocMarkdown);
      finalContent = marked(markdownContent);
      finalContent = finalContent.replace('[[TOC]]', tocHTML);

      //use compiled template to produce html file
      var fileContents = mdtemplate({
        title: meta.Title,
        description: meta.Description,
        content: finalContent,
        version: version,
      });

      ensureCritical(fileContents);
    } else {
      // new jade file type
      ensureCritical(jade.render(content, {
        pretty: false,
        filename: file.absPath,
        version: version,
      }));
    }
  },

  postProcess: function() { // files
   
  },
};