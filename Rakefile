require 'rubygems'
require 'rake'
require 'rdoc'
require 'date'
require 'yaml'
require 'tmpdir'
require 'jekyll'
require 'shellwords'

desc "Generate website files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end


desc "Generate and publish website to gh-pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    message = "Site updated at #{Time.now.utc}"
    system "git commit -am #{message.shellescape}"
    system "git push origin gh-pages"
    system "mv _site/* #{tmp}"
    system "mv CNAME #{tmp}"
    system "mv *.md #{tmp}"
    system "git checkout -B master"
    system "rm -rf *"
    system "mv #{tmp}/* ."
    system "git add ."
    system "git commit -am #{message.shellescape}"
    system "git push origin master --force"
    system "git checkout gh-pages"
    system "echo yo!"
  end
end

task :default => :publish
