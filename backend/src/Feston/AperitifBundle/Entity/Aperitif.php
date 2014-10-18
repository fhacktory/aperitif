<?php

namespace Feston\AperitifBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Aperitif
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Aperitif
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     */
    private $created;

    /**
     * @var string
     *
     * @ORM\Column(name="private_id", type="string", length=10)
     */
    private $privateId;

    /**
     * @var string
     *
     * @ORM\Column(name="public_id", type="string", length=10)
     */
    private $publicId;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=255)
     */
    private $username;

    /**
     * @var string
     *
     * @ORM\Column(name="location", type="string", length=255)
     */
    private $location;

    public function __construct($username, $location)
    {
        $this->created = new \DateTime();
        $this->username = $username;
        $this->location = $location;

        $privateId = substr(base_convert(sha1(uniqid(mt_rand(), true)), 16, 36), 0, 10); // 3.65E15 possibilities
        $this->setPrivateId($privateId);

        $publicId = substr(base_convert(sha1(uniqid(mt_rand(), true)), 16, 36), 0, 10); // 3.65E15 possibilities
        $this->setPublicId($publicId);
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Aperitif
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set privateId
     *
     * @param string $privateId
     * @return Aperitif
     */
    public function setPrivateId($privateId)
    {
        $this->privateId = $privateId;

        return $this;
    }

    /**
     * Get privateId
     *
     * @return string
     */
    public function getPrivateId()
    {
        return $this->privateId;
    }

    /**
     * Set publicId
     *
     * @param string $publicId
     * @return Aperitif
     */
    public function setPublicId($publicId)
    {
        $this->publicId = $publicId;

        return $this;
    }

    /**
     * Get publicId
     *
     * @return string
     */
    public function getPublicId()
    {
        return $this->publicId;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return Aperitif
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set location
     *
     * @param string $location
     * @return Aperitif
     */
    public function setLocation($location)
    {
        $this->location = $location;

        return $this;
    }

    /**
     * Get location
     *
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }
}
