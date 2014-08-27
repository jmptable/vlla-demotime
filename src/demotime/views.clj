(ns demotime.views 
  (:use [hiccup core page]))

(defn my-include-js
  [& files]
  (let [full-paths (map #(str "/js/" %) files)]
    (apply include-js full-paths)))

(defn my-include-css
  [& files]
  (let [full-paths (map #(str "/css/" %) files)]
    (apply include-css full-paths)))

(defn editor-page []
  (html5
    [:head
     [:title "demotime"]
     (my-include-css "bootstrap.min.css" "bootstrap-theme.min.css")
     (my-include-js "jquery-2.1.1.min.js")]
    [:body {:onload "init()"}
     (my-include-js "bootstrap.min.js")]))