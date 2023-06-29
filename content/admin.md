---
Title: Admin
Description: Example of markdown
---



## How to make a change to the site?

1. Create an account on [Github](https://github.com/join)(it's free) and log in.
1. head to the repositories content folder: https://github.com/jamesjnadeau/addisoncountyfielddays/tree/master/content
1. Find the page whose content you'd like to edit in the content folder, and navigate to it so you are looking at it's "code" in the main part of the screen
1. Find the Pencil ✏ icon at the top right, in the gray horizontal bar above the actual text of the page. Click on this icon to being making edits.
1. Edit the page, please note you can use the preview button.
1. When done, scroll to the bottom and enter a commit message about the changes your making, why they are needed, and anything else relevant to the change. Click commit when you're ready
1. On the next page, hit the green button to start the process of creating a pull request. 
2. You'll be presented with a form that is prefilled with your original commit. Add any extra infromation here I might need to know about when to push this live or who to conact once it is live.
3. You'll have to scroll down a bit and hit green button again to confirm and create your pull request.
4. After finishing the pull request, the page should change again and a test version of the site will begin to build
5. James will be notified and he'll push the changes to the site after review. If you need help, please use the site contact form and I'll reach out and offer help.

[Link to Video of the above process](https://drive.google.com/file/d/1avMoWopB3Uo-SvHJ8wrU96j2a8CLlm42/view)

# This is a "static site"

That means this site is bundled up into a bunch of unchangable files each time it's built.
It can be hosted anywhere really.

It's currently being hosted on netlify. 

Changes made to this repository:

https://github.com/jamesjnadeau/addisoncountyfielddays/

are automatically reflected in the live site once it's built successfully.

The sites main content is in the content folder of that repository.
The file structure of the content folder reflects the url structure of the site.

Most of the pages are made in markdown.

Some of the more complicated ones are made in an html template language known as jade, which is now called pug. Their formats are pretty interchangeable.
