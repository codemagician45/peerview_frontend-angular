import {Component, OnInit} from "@angular/core";
import * as $ from "jquery";

@Component({
    selector: "app-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {

    public current_type = "";
    public deals = [
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Banana Republic",
            "text": "Save 15% on full-priced, in-store purchases only.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Bulk Barn",
            "text": "Students receive 10% off on Wednesdays with valid ID.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Club Monaco",
            "text": "Both full-priced and sale items are 20% off with your valid post-secondary ID. " +
            " If you’re shopping online, submit your email to receive a code",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "H&M",
            "text": "Valid ID must be presented to receive 15% off entire in-store purchases.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "J. Crew",
            "text": "The store offers 15% off when you’re shopping in-store and show a valid school ID at checkout. " +
            " The offer is only valid on purchases made in J.Crew, J.Crew Factory and J.Crew Mercantile stores.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Kate Spade",
            "text": "Show your student ID and receive 15% off your purchase.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Levi's",
            "text": "This store offers 15% off for students. Register to receive the same 15% off for online purchases.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Roots",
            "text": "Students save 20% with their student discount on regular-priced items. " +
            " You can purchase anything on sale and you’ll still be able to receive 10% off.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Sally Beauty Supply",
            "text": "Save on products with your Beauty Student Card from Sally Beauty Supply. " +
            " You’ll get monthly specials and special email offers to take advantage of.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "TOMS",
            "text": "Students can get free shipping on all orders of TOMS Shoes; " +
            " the company donates a pair of shoes to a child in need for every pair you buy.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Top Shop",
            "text": "Students get 10% off. Visit their website for more information.",
        },
        {
            "type": "Retail",
            "badge": "blue",
            "header": "Urban Outfitters",
            "text": "Save 10% off on specific days with your Student ID. " +
            " Sign up for their Student Program to be told when to use your discount.",
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "St.Louis Bar & Grill",
            "text": "Get $5 off any hot menu item or 20% off food.",
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "Subway",
            "text": "Students receive a discount of 10% with valid ID.",
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "Hard Rock Cafe",
            "text": "Hard Rock Cafe locations worldwide offer a 10% discount for students with valid ISIC.",
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "Dairy Queen",
            "text": "Students receive a discount of 10% off their purchase."
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "Chipotle",
            "text": "Students receive a free soft drink after the purchase of food, when they show their ID.",
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "Burger King",
            "text": "Students can receive 10% off their meal by showing their student card.",
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "Buffalo Wild Wings",
            "text": "At many locations across Canada you can receive 10% off your meal. " +
            " Just ask your server to see if the deal is available at your location.",
        },
        {
            "type": "Restaurants and Bars",
            "badge": "orange",
            "header": "Arby’s",
            "text": "Students save 10% off their entire meal when they use their ID.",
        },
        {
            "type": "Technology",
            "badge": "red",
            "header": "Apple",
            "text": "Get wireless Beats headphones when you buy an eligible computer, " +
            " tablet or smartphone with a valid student ID. " +
            " Apple also offers special education pricing on Apple computers, select software and third party products " +
            " to post-secondary students, " +
            " parents buying for a post-secondary student, or faculty and teachers. Pricing can be found here.",
        },
        {
            "type": "Technology",
            "badge": "red",
            "header": "Adobe",
            "text": "Full-time students can receive discounts on software, such as 60% on Creative Cloud."
        },
        {
            "type": "Technology",
            "badge": "red",
            "header": "Best Buy",
            "text": "Check out the Students Savings program for exclusive deals on laptops, tablets, desktops and small appliances."
        },
        {
            "type": "Technology",
            "badge": "red",
            "header": "Dell",
            "text": "Dell offers discounts on laptops, desktops and more. You can check out these deals online."
        },
        {
            "type": "Technology",
            "badge": "red",
            "header": "Microsoft",
            "text": "Students can save up to $194 on a Surface Pro 3, or save 10% on accessories. " +
            " They also get special pricing on software. Visit the Microsoft Store website for more information."
        },
        {
            "type": "Technology",
            "badge": "red",
            "header": "Shaw",
            "text": "Keep your student budget balanced with Shaw. Students get internet for just $35 per month for eight months."
        },
        {
            "type": "Cellphone Companies",
            "badge": "yellow",
            "header": "Rogers",
            "text": "This phone company has a student offer available called “split them into offers” which can vary. " +
            " One offers a Samsung Galaxy S6 or Galaxy S7 for $0.05 on a two-year Premium + Tab Share Everything plan. " +
            " Another takes $10 off a monthly bill for each new number added to a Share Everything plan. " +
            " A data-focused offer adds 2GB for $5 on select Share Everything plans."
        },
        {
            "type": "Cellphone Companies",
            "badge": "yellow",
            "header": "Bell",
            "text": "The company is offering students the same thing as Rogers, namely the 2GB " +
            " extra on plans that start with 5GB. Until Sept. 30, there is also " +
            " a 1GB bonus for tablets on a two-year Tablet Flex or Share plan."
        },
        {
            "type": "Cellphone Companies",
            "badge": "yellow",
            "header": "Telus",
            "text": "This mobile provider is offering a 2GB monthly bonus for " +
            " $5 for any student activating or upgrading a premium smartphone on a two-year Your Choice plan."
        },
        {
            "type": "Other",
            "badge": "green",
            "header": "Amazon Student",
            "text": "Students receive 50% off Amazon’s Prime service, which includes unlimited two-day shipping, " +
            " after a six-month free trial. They also receive exclusive offers and discounts and eligibility for sweepstakes and contests."
        },
        {
            "type": "Other",
            "badge": "green",
            "header": "FedEx",
            "text": "When you’re shipping a package, you can earn 20% to 30% off by showing your student ID."
        },
    ];

    constructor() {
    }

    ngOnInit() {
        const that_ang = this;
        $(".tabChange").click(function (e) {
            e.preventDefault();
            const that = $(this);
            const panel = that.data("tab-name");
            that_ang.current_type = panel;
            $(".deals-tabs li").removeClass("active");
            that.parent().addClass("active");
            return false;
        });
    }

    more(e, deal) {
        e.preventDefault();
        deal.more = !deal.more;
        return false;
    }

    getStyle(deal) {
        return deal.more ? "100%" : "45px";
    }

}
