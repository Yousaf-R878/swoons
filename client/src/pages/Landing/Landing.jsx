import React, { useState, useEffect, useContext, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import Hero from "../../components/Hero/Hero";
import Post from "@/src/components/PostCard/Post";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LoginDialog from "../../components/Login/LoginDialog/LoginDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import "./Landing.css";
import { AuthorizeContext } from "@/src/contexts/auth";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import profilePic from '../../assets/profile.png';

import API from "../../services/apiClient";
import { Separator } from "@/components/ui/separator";

const Landing = () => {
  const { currentUser } = useContext(AuthorizeContext);
  const [mostLikedDates, setMostLikedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const learnMoreRef = useRef(null);

  const scrollToLearnMore = () => {
    console.log('yo')
    learnMoreRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMostLikedDates = async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      try {
        const response = await API.getDates([], "likes");
        if (response.data) {
          setMostLikedDates(response.data.dates.slice(0, 3)); // Take the top 3 most liked dates
        } else {
          console.error("Failed to fetch dates:", response.error);
        }
      } catch (error) {
        console.error("There was an error fetching the dates:", error);
      }
      setIsLoading(false);
    };
    fetchMostLikedDates();
  }, []);

  return (
    <>
      <Hero scrollToLearnMore={scrollToLearnMore}/>
      <div className="mt-8">
        <h2 className="text-4xl text-center font-bold">Trending</h2>
        <div className="relative my-8 mx-10">
          <div className="flex justify-center items-center">
            {isLoading ? (
              <LoadingProgress />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                {mostLikedDates.map((date) => (
                  <Post key={date._id} date={date} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex justify-center">
              <Button className="w-40 h-15 transition delay-100 duration-300 ease-in-out hover:bg-primary-hover text-xl min-w-[100px] max-w-xs mb-4 sm:mb-0">
                See More
              </Button>
            </div>
          </DialogTrigger>
          <LoginDialog />
        </Dialog>

        <div className="flex flex-row bg-secondary mt-4 justify-around" ref={learnMoreRef}>
          <div className="flex flex-col">
            <div className="flex flex-row my-12 max-w-[45vw]">
              <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 24 24" className="fill-white"><path d="M23 18h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-15.999-10c-2.493 0-4.227 2.383-1.866 6.839.774 1.464-.826 1.812-2.545 2.209-1.491.345-1.59 1.072-1.59 2.334l.002.618h1.329c0-1.918-.186-1.385 1.824-1.973 1.014-.295 1.91-.723 2.316-1.612.212-.463.355-1.22-.162-2.197-.952-1.798-1.219-3.374-.712-4.215.547-.909 2.27-.908 2.819.015.935 1.567-.793 3.982-1.02 4.982h1.396c.44-1 1.206-2.208 1.206-3.9.001-2.01-1.31-3.1-2.997-3.1zm7.754-1.556c.895-1.487 3.609-1.494 4.512.022.77 1.291.423 3.484-.949 6.017-.098.18-.17.351-.232.517h1.464c3.057-5.744.816-9-2.548-9-3.323 0-5.635 3.177-2.488 9.119 1.033 1.952-1.101 2.416-3.394 2.946-1.988.458-2.12 1.429-2.12 3.11l.003.825h1.331c0-2.069-.08-2.367 1.173-2.657 1.918-.442 3.729-.86 4.39-2.305.241-.527.401-1.397-.206-2.543-1.362-2.572-1.704-4.777-.936-6.051z"/></svg>
                  <div className="flex flex-col justify-center items-start ml-4">
                    <h2 className="text-2xl text-center text-white font-bold">Share Experiences</h2>
                    <Separator/>
                    <p className="mt-2 text-white text-lg">Had a great time out and about? Share your experiences with others and start a trend!</p>
                  </div>
                  
              </div>
              <div className="flex flex-row my-12 max-w-[45vw]">
              <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 24 24" className="fill-white"><path d="M18 0c-3.148 0-6 2.553-6 5.702 0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298 0-3.149-2.852-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm-12-3c-2.099 0-4 1.702-4 3.801 0 3.121 3.188 3.451 4 8.199.812-4.748 4-5.078 4-8.199 0-2.099-1.901-3.801-4-3.801zm0 5.333c-.737 0-1.333-.597-1.333-1.333s.596-1.333 1.333-1.333 1.333.596 1.333 1.333-.596 1.333-1.333 1.333zm6 5.775l-3.215-1.078c.365-.634.777-1.128 1.246-1.687l1.969.657 1.92-.64c.388.521.754 1.093 1.081 1.75l-3.001.998zm12 7.892l-6.707-2.427-5.293 2.427-5.581-2.427-6.419 2.427 3.62-8.144c.299.76.554 1.776.596 3.583l-.443.996 2.699-1.021 4.809 2.091.751-3.725.718 3.675 4.454-2.042 3.099 1.121-.461-1.055c.026-.392.068-.78.131-1.144.144-.84.345-1.564.585-2.212l3.442 7.877z"/></svg>
                  <div className="flex flex-col justify-center items-start ml-4">
                    <h2 className="text-2xl text-center text-white font-bold">Find New Adventures</h2>
                    <Separator/>
                    <p className="mt-2 text-white text-lg">Find the right date for you and any (or all) of your partners and friends.</p>
                  </div>
                  
              </div>
          </div>
          <div className="flex flex-col">
              <div className="flex flex-row my-12 max-w-[45vw]">
              <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 24 24" className="fill-white"><path d="M13.144 8.171c-.035-.066.342-.102.409-.102.074.009-.196.452-.409.102zm-2.152-3.072l.108-.031c.064.055-.072.095-.051.136.086.155.021.248.008.332-.014.085-.104.048-.149.093-.053.066.258.075.262.085.011.033-.375.089-.304.171.096.136.824-.195.708-.176.225-.113.029-.125-.097-.19-.043-.215-.079-.547-.213-.68l.088-.102c-.206-.299-.36.362-.36.362zm13.008 6.901c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12s5.372-12 12-12c6.627 0 12 5.373 12 12zm-8.31-5.371c-.006-.146-.19-.284-.382-.031-.135.174-.111.439-.184.557-.104.175.567.339.567.174.025-.277.732-.063.87-.025.248.069.643-.226.211-.381-.355-.13-.542-.269-.574-.523 0 0 .188-.176.106-.166-.218.027-.614.786-.614.395zm6.296 5.371c0-1.035-.177-2.08-.357-2.632-.058-.174-.189-.312-.359-.378-.256-.1-1.337.597-1.5.254-.107-.229-.324.146-.572.008-.12-.066-.454-.515-.605-.46-.309.111.474.964.688 1.076.201-.152.852-.465.992-.038.268.804-.737 1.685-1.251 2.149-.768.694-.624-.449-1.147-.852-.275-.211-.272-.66-.55-.815-.124-.07-.693-.725-.688-.813l-.017.166c-.094.071-.294-.268-.315-.321 0 .295.48.765.639 1.001.271.405.416.995.748 1.326.178.178.858.914 1.035.898.193-.017.803-.458.911-.433.644.152-1.516 3.205-1.721 3.583-.169.317.138 1.101.113 1.476-.029.433-.37.573-.693.809-.346.253-.265.745-.556.925-.517.318-.889 1.353-1.623 1.348-.216-.001-1.14.36-1.261.007-.094-.256-.22-.45-.353-.703-.13-.248-.015-.505-.173-.724-.109-.152-.475-.497-.508-.677-.002-.155.117-.626.28-.708.229-.117.044-.458.016-.656-.048-.354-.267-.646-.53-.851-.389-.299-.188-.537-.097-.964 0-.204-.124-.472-.398-.392-.564.164-.393-.44-.804-.413-.296.021-.538.209-.813.292-.346.104-.7-.082-1.042-.125-1.407-.178-1.866-1.786-1.499-2.946.037-.19-.114-.542-.048-.689.158-.352.48-.747.762-1.014.158-.15.361-.112.547-.229.287-.181.291-.553.572-.781.4-.325.946-.318 1.468-.388.278-.037 1.336-.266 1.503-.06 0 .038.191.604-.019.572.433.023 1.05.749 1.461.579.211-.088.134-.736.567-.423.262.188 1.436.272 1.68.069.15-.124.234-.93.052-1.021.116.115-.611.124-.679.098-.12-.044-.232.114-.425.025.116.055-.646-.354-.218-.667-.179.131-.346-.037-.539.107-.133.108.062.18-.128.274-.302.153-.53-.525-.644-.602-.116-.076-1.014-.706-.77-.295l.789.785c-.039.025-.207-.286-.207-.059.053-.135.02.579-.104.347-.055-.089.09-.139.006-.268 0-.085-.228-.168-.272-.226-.125-.155-.457-.497-.637-.579-.05-.023-.764.087-.824.11-.07.098-.13.201-.179.311-.148.055-.287.126-.419.214l-.157.353c-.068.061-.765.291-.769.3.029-.075-.487-.171-.453-.321.038-.165.213-.68.168-.868-.048-.197 1.074.284 1.146-.235.029-.225.046-.487-.313-.525.068.008.695-.246.799-.36.146-.168.481-.442.724-.442.284 0 .223-.413.354-.615.131.053-.07.376.087.507-.01-.103.445.057.489.033.104-.054.684-.022.594-.294-.1-.277.051-.195.181-.253-.022.009.34-.619.402-.413-.043-.212-.421.074-.553.063-.305-.024-.176-.52-.061-.665.089-.115-.243-.256-.247-.036-.006.329-.312.627-.241 1.064.108.659-.735-.159-.809-.114-.28.17-.509-.214-.364-.444.148-.235.505-.224.652-.476.104-.178.225-.385.385-.52.535-.449.683-.09 1.216-.041.521.048.176.124.104.324-.069.19.286.258.409.099.07-.092.229-.323.298-.494.089-.222.901-.197.334-.536-.374-.223-2.004-.672-3.096-.672-.236 0-.401.263-.581.412-.356.295-1.268.874-1.775.698-.519-.179-1.63.66-1.808.666-.065.004.004-.634.358-.681-.153.023 1.247-.707 1.209-.859-.046-.18-2.799.822-2.676 1.023.059.092.299.092-.016.294-.18.109-.372.801-.541.801-.505.221-.537-.435-1.099.409l-.894.36c-1.328 1.411-2.247 3.198-2.58 5.183-.013.079.334.226.379.28.112.134.112.712.167.901.138.478.479.744.74 1.179.154.259.41.914.329 1.186.108-.178 1.07.815 1.246 1.022.414.487.733 1.077.061 1.559-.217.156.33 1.129.048 1.368l-.361.093c-.356.219-.195.756.021.982 1.818 1.901 4.38 3.087 7.22 3.087 5.517 0 9.989-4.472 9.989-9.989zm-11.507-6.357c.125-.055.293-.053.311-.22.015-.148.044-.046.08-.1.035-.053-.067-.138-.11-.146-.064-.014-.108.069-.149.104l-.072.019-.068.087.008.048-.087.106c-.085.084.002.139.087.102z"/></svg>
                  <div className="flex flex-col justify-center items-start ml-4">
                    <h2 className="text-2xl text-center text-white font-bold">See the World in a New Light</h2>
                    <Separator/>
                    <p className="mt-2 text-white text-lg">There is always more to an area than meets the eye. Find a new way to enjoy your city!</p>
                  </div>
              </div>
              <div className="flex flex-row my-12 max-w-[45vw]">
              <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 24 24" className="fill-white"><path d="M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z"/></svg>
                  <div className="flex flex-col justify-center items-start ml-4">
                    <h2 className="text-2xl text-center text-white font-bold">Explore Your City</h2>
                    <Separator/>
                    <p className="mt-2 text-white text-lg">Have a fun time anywhere within your city. There is always something to do!</p>
                  </div>
                  
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
