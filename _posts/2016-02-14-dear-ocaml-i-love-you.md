---
layout: post
title:  "Ocaml Love"
date:   2016-02-14 10:12:00
author: "Gina Maini"
---

For the past 3 months I've been learning OCaml.
And I'm in love!

![Duck Love](/images/duck-love.gif)

I decided to write this blog post because I'm so head over heels for
OCaml I just had to pause and share the love. By the end of this post,
I hope you're vomiting glitter and on the functional programming hype
train.

It might help the reader to know that my previous jobs were JavaScript engineering positions (Angular, jQuery, Node, the usual suspects you waste countless hours debugging) so if I mispronounce some type theory thing, you have permission to roll your eyes. 

In my past-life (a few months ago), I constantly felt like web development was... too hard. Like sisyphus rolling a boulder uphill to the end of time
hard. Don't get me wrong-- I loved a lot of the tools I worked with. I like Backbone, I think SASS is the beesknees, and the Node eco-system is dope.

That said, I have a pretty different opinion now than three months
ago. Here are three entirely wrong preconceived notions I had about typed, functional programming and OCaml.

## 1. Thinking in types is difficult and unnatural.

Are you ready to take the blue pill, Neo? *You already think in types and you know that it's good for you.* 

I don't need to persuade you because you've already heard about "Test Driven Development". You heard about it, drank the koolaid, own the tshirt, and know the importance of unit tests. You know that to ship, document, and reproduce code, you need to have the types line up. You can't call the method `Canine.bark()` on an instance of `Cat` and you want your test to immediately blow up and catch that when you're developing. But here's the real kick-- OCaml's type system gives you this safety for free! If you try to add two functions or mod two strings your program _won't even compile_. It even knows when you've forgotten to handle a case. For example: 

{% highlight ocaml %}
let reverse l =
  let rec loop original copy =
      match original with
      (* | [] -> copy *)
      | item::rest -> loop rest (item::copy)
in loop l []
{% endhighlight %}

Will generate this warning:

{% highlight ocaml lineos%}
Warning 8: this pattern-matching is not exhaustive.                 
Here is an example of a value that is not matched:                  

[]
{% endhighlight %}

--but this:

{% highlight ocaml lineos%}
let reverse l =
  let rec loop original copy =
      match original with
      | [] -> copy
      | item::rest -> loop rest (item::copy)
in loop l []
{% endhighlight %}
--has no warnings because the match is exhaustive.

> Note the `(* *)` symbols are comments, `( :: )` symbol is the Cons
> operator, `( | )` is pattern matching (which is why we're able to talk
> about our list generically enough to say what to do when it's empty
> and when it's full). The `rec` just signifies that our function loop is
> recurisve.

# The type system gives you far more than just safety.

Reasoning about systems is incredibly complex. When you can't reason
about a system fully, bugs happen. For readers whom played
Civilization, it reminds me of dark map areas that every few
turns produce barbarians. Let me suggest watching the
beginning of [this lecture] video by Xavier Leroy (one of the creators
of OCaml). The punchline is this: How do you know your program
actually did what you wanted it to do? In JavaScript, the short answer
is, "If it passed three times, I guess it's correct." In retrospect,
this type of half-assed approached to development makes my stomach
flop. We get away with it because browsers swallow errors and
your client programs are sandboxed.

_But it's still broken, dude._

People use browsers to do all sorts of things! Purchase and make
payments with credit cards, submit healthcare information, email
sensitive documents, and enter passwords. Do you really want to rely
on "third time's the charm" development? It's ironic that I've met so
many snarky security people who make fun of other people's bugs, but
use Ruby or Perl for everything. If you could eliminate a whole
suite of bugs from the beginning, why wouldn't you?

And types are really, really useful! Here's an example of one of the
more bread and butter components: the algebraic data type. This is a
snippet of a problem I did called Captain Prime on Hackerrank
(equivalent to Problem 37 on Project Euler):

{% highlight ocaml lineos %}

(* ...some previous code *)

type fate = Central | Left | Right | Dead
let base_case = function n -> is_prime (int_of_string n) && not (contains_zero n)
let check_left = function n -> is_all_prime (List.rev (to_list n)) true
let check_right = function n -> is_all_prime (to_list n) false

let sorting_hat id =
  if not (base_case id) then Dead
  else
    begin
      if check_left id && check_right id then Central
      else if check_left id then Left
      else if check_right id then Right
      else Dead
    end

let () =
  match read_lines () with
  | _::ids ->
    List.map begin fun x ->
      match sorting_hat x with
      | Dead -> "DEAD"
      | Central -> "CENTRAL"
      | Right -> "RIGHT"
      | Left -> "LEFT"
    end ids
    | > List.iter print_endline                                    
| [] -> raise (Invalid_argument "Must provide correct input.")

{% endhighlight %}

There are a lot of cool things going on here. Notice at the top, I
decided to make an algebraic data type called `fate` which can be
either `Right`, `Center`, `Left`, or `Dead`. The specifics of this
problem aren't important, but the thing to note is I *pattern
match* on the value of the `fate` type given back from the `sorting_hat`
function-- and from that generate some strings to eventually print. This
is MUCH more elegant and readable than comparing strings or mutating
return values.

## 2. The hardest thing about functional, typed languages will be using Monads. 

Another big lie. Monads are pretty mundane in functional programming
and really, you don't even need to know how they work to use
them. Since I'm a noob and plenty of other people have written that
blog post, I'll just trust you see for yourself. If you're still
curious, [Edgar] and I have an [example] using Lwt and Cohttp to
make an HTTP request with monads galore! Very mundane.

The biggest personal hurdle for me coding in OCaml was having
to become a better programmer. OCaml meant that there wasn't all this
noisey "undefined is not a function" business and suddenly, I
needed to understand time vs. space complexity, the use cases for the Set module
vs. the Hashtable module vs. the Map module. I had to know about the
Unix module, which meant that I needed to read a bit about operating
systems. It has forced me to think about programs in terms of one
directional flows and transformations of data structures. In short, it
forced me to have to think about my programs.

## 3. OCaml is a functional language. 

### Well, not really. But yeah? I mean, it's functional.

OCaml is (as academic languages go) very pragmatic. You can do a
for loop, a while loop, you have true OO inheritance if you want it
(but apparently nobody uses it), and you can have mutable data
types like refs and Arrays. At the same time, you get a wicked
powerful type system with features Haskell doesn't even have (like
polymorphic variants). OCaml's modules are first class citizens and its
interfaces make code really readable and awesome.

Ask one of your Java homies if they like their interfaces. They'll
probably say **"Duh girl, interfaces are the sh!t!"** OCaml
interfaces are similar but better because they aren't named
`AbstractFactoryPersonClassImplementation` and eschew the long
subtyping chains that make large OO codebases difficult to reason about.

If you're still like, what ze heck is this OCaml? Check out [this talk] talk by Yaron Minsky about what Jane Street does with OCaml. 

And now for dessert, some of my favorite OCaml code from my scratch.ml
file (which might become sentient in 5 years)!

{% highlight ocaml lineos %}
(** Examples from the book "More OCaml" by John Whitington *)
(* Infinite Linked List type definition *)
type 'a infinite = Cons of 'a * (unit -> 'a infinite)

(* Difference between Copy and Append *)
let copy l = List.fold_right (fun e a -> e :: a) l []
let append x y = List.fold_right (fun e a -> e :: a) x y

(** Another Hackerrank problem I solved *)
(* Rotate a string, such that:
   Input "abcde" gives back
   bcdea cdeab deabc eabcd abcde *)

let rotate_str s =
  let sub i k = String.sub s i k in
  let rec rotate count original accum =
    if count = String.length original
    then List.rev (original::accum)
    else
      let offset = (String.length original - count) in
      rotate (count + 1) original
        (((sub count offset) ^ (sub 0 count))::accum)
  in
  rotate 1 s [] |> String.concat " "
{% endhighlight %}

[this talk]: https://blogs.janestreet.com/caml-trading-talk-at-cmu
[Edgar]: https://twitter.com/EdgarArout
[example]: https://github.com/wiredsister/example-ocaml
[this lecture]: https://www.cs.uoregon.edu/research/summerschool/summer12/videos/Leroy1_1.mp4
