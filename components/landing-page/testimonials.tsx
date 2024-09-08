import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useThemeStore } from "@/store";
import { fetchTestimonials } from '@/service/testimonial.service';
import toast from 'react-hot-toast';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Loader2 } from 'lucide-react';
import { getS3BasePath } from '@/config/aws';

// Define the interface for Testimonial data
export interface Testimonial {
  id: number;
  uuid: string;
  customer_name: string;
  designation: string;
  image: string;
  review: string;
  rating: number;
  is_active: boolean;
  title: string;
  company_name: string;
  location_city: string;
  source_name: string;
  created_at: string;
  updated_at: string;
}


const Testimonials: React.FC = () => {
  const { isRtl } = useThemeStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const staticPath = getS3BasePath()
  useEffect(() => {
    fetchTestimonial();
  }, []);

  //Function to fetch testimonials
  const fetchTestimonial = async () => {
    setLoading(true)
    try {
      const response = await fetchTestimonials();
      if (response?.status !== true && response?.statusCode !== 200) {
        toast.error(response?.message);
      }
      setTestimonials(response?.data?.result);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <section className="py-20 overflow-hidden bg-[#F8F8F8]" id="offers">
        <div className="container">
          <h1 className="max-w-[600px] mx-auto text-xl md:text-2xl xl:text-[38px] xl:leading-[52px] mb-10 font-bold text-[#ff5757] text-center">
            Our Happy <span className="text-primary"> Partners</span><span className="text-primary">.</span>
          </h1>
          <div className="space-y-10">
            {loading && <Loader2 className="mr-2 h-10 w-10 animate-spin" />}
            {!loading && testimonials?.length > 0 && (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                  direction: isRtl ? "rtl" : "ltr",
                }}
                className="w-full mx-auto"
              >
                <CarouselContent>
                  {testimonials.map((testimonial) => {
                    return (
                      <CarouselItem key={testimonial?.uuid} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-6 bg-white rounded-2xl space-y-4 border-t-4 border-red-500/0 hover:border-[#ff5757] duration-200">
                          <div className="flex items-center gap-4">
                            {testimonial?.image ? (
                              <Image
                                className="w-16 h-16 rounded-[100%]"
                                src={`${staticPath}/testimonial/${testimonial?.id}/small/${testimonial?.image}`}
                                width={200}
                                height={200}
                                alt={testimonial.customer_name}
                              />
                            ) : (
                              <Avatar className="rounded-full">
                                <AvatarFallback>
                                  {testimonial?.customer_name.split(' ').map(name => name[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="font-medium dark:text-white">
                              <div className="font-bold">{testimonial?.customer_name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.designation}</div>
                            </div>
                          </div>
                          <p className="text-[#192537] leading-normal">"{testimonial?.review}"</p>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
